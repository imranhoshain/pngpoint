import logging
import os
from io import BytesIO

from api.images.serializers.single_image import SingleImageSerializer
from celery import shared_task
from django.core.cache import cache

from images.models import Images
from images.services.cloudflare import (
    GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE,
    GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE,
    UPLOAD_IMAGES_TO_CLOUDFLARE,
)

logger = logging.getLogger(__name__)


@shared_task
def process_bulk_upload(images_path, image_ids, metadata=None, user_id=None):
    """
    Upload multiple images to Cloudflare and update DB.
    """
    for i, path in enumerate(images_path):
        original_name = os.path.basename(path)
        try:
            with open(path, "rb") as f:
                file_bytes = f.read()

            logger.info(f"Uploading {original_name} to Cloudflare...")

            cloudflare_data = UPLOAD_IMAGES_TO_CLOUDFLARE(
                BytesIO(file_bytes), filename=original_name
            )

            img_obj = Images.objects.get(id=image_ids[i])
            img_obj.cloudflare_url = cloudflare_data["url"]
            img_obj.cloudflare_id = cloudflare_data["id"]
            img_obj.save()
            cache_single_image_task.delay(img_obj.slug)

            logger.info(
    """_summary_
    """                f"Uploaded image {img_obj.id} successfully. URL: {cloudflare_data['url']}"
            )

        except Exception as e:
            logger.error(f"Failed to upload {original_name}: {str(e)}")

        finally:
            if os.path.exists(path):
                try:
                    os.remove(path)
                    logger.info(f"Deleted temp file: {path}")
                except PermissionError as pe:
                    logger.error(f"Could not delete temp file {path}: {str(pe)}")


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def cache_single_image_task(self, slug):
    try:
        logger.info(f"Starting cache task for image: {slug}")
        deleted_count = _delete_all_cache_variations(slug)
        logger.info(f"Deleted {deleted_count} cache entries for: {slug}")

        image = (
            Images.objects.select_related("user", "category", "sub_category")
            .prefetch_related("keywords")
            .filter(slug=slug)
            .first()
        )

        if not image:
            logger.warning(f"Image not found: {slug}")
            return {
                "success": False,
                "slug": slug,
                "message": "Image not found",
                "deleted_cache_entries": deleted_count,
            }

        main_keywords = list(image.keywords.all().order_by("id"))

        if not main_keywords:
            logger.warning(f"Image has no keywords: {slug}")
            return {
                "success": False,
                "slug": slug,
                "message": "Image has no keywords, cannot cache related images",
                "deleted_cache_entries": deleted_count,
            }

        first_kw = main_keywords[0]
        first_kw_slug = first_kw.slug

        related_qs = (
            Images.objects.filter(keywords__slug=first_kw_slug)
            .exclude(pk=image.pk)
            .prefetch_related("keywords")
            .distinct()
            .order_by("-created_at")
        )

        related_list = []
        for img in related_qs:
            img_keywords = list(img.keywords.all().order_by("id"))
            if img_keywords and img_keywords[0].slug == first_kw_slug:
                related_list.append(img)

        related_list = related_list[:50]

        related_serializer = SingleImageSerializer(related_list, many=True)
        main_image_data = SingleImageSerializer(image).data

        if image.cloudflare_id:
            cf_url = GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE(image.cloudflare_id)
            main_url = GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE(image.cloudflare_id)
            main_image_data["cloudflare_url"] = cf_url
            main_image_data["url"] = cf_url
            main_image_data["main_url"] = main_url
        response_data = {
            "count": len(related_serializer.data),
            "results": related_serializer.data,
            "image": main_image_data,
            "success": True,
            "message": "Image with related images fetched successfully.",
        }
        cache_key = f"single_image:{slug}"
        cache.set(cache_key, response_data, timeout=None)

        logger.info(
            f"Successfully cached image: {slug} with {len(related_list)} related images"
        )

        return {
            "success": True,
            "slug": slug,
            "message": "Image cached successfully",
            "related_count": len(related_list),
            "deleted_cache_entries": deleted_count,
            "cache_key": cache_key,
        }

    except Exception as exc:
        logger.error(f"Error caching image {slug}: {str(exc)}")
        raise self.retry(exc=exc)


def _delete_all_cache_variations(slug):
    deleted_count = 0
    base_key = f"single_image:{slug}"
    if cache.delete(base_key):
        deleted_count += 1
    try:
        pattern = f"single_image:{slug}:*"
        deleted_keys = cache.delete_pattern(pattern)
        if isinstance(deleted_keys, int):
            deleted_count += deleted_keys
        else:
            deleted_count += len(deleted_keys) if deleted_keys else 0
    except AttributeError:
        pass

    return deleted_count
