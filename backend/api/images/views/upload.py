import logging
import random
from django.utils.text import slugify
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import status
from django.db import transaction
from images.models import Images, Keywords
from images.services.cloudflare import UPLOAD_IMAGES_TO_CLOUDFLARE

logger = logging.getLogger(__name__)

def make_unique_title_and_slug(title, used_titles=None):

    if used_titles is None:
        used_titles = set()

    original_title = title.strip()
    new_title = original_title

    while Images.objects.filter(title=new_title).exists() or new_title in used_titles:
        random_number = random.randint(100, 999)
        if original_title.endswith("."):
            new_title = f"{original_title[:-1]}{random_number}."
        else:
            new_title = f"{original_title}{random_number}"

    used_titles.add(new_title)

    base_slug = slugify(new_title)
    new_slug = base_slug
    counter = 1
    while Images.objects.filter(slug=new_slug).exists():
        new_slug = f"{base_slug}-{counter}"
        counter += 1

    return new_title, new_slug, used_titles

class ImagesUploadAPIView(APIView):
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request, *args, **kwargs):
        images = request.FILES.getlist("images")
        titles = request.data.getlist("title")
        descriptions = request.data.getlist("description")
        keywords_list = request.data.getlist("keywords")

        if not images:
            return Response({
                "success": False,
                "error": "No images provided"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        created_images = []
        failed_images = []
        used_titles = set()

        for i, image_file in enumerate(images):
            try:
                try:
                    title = titles[i].strip()
                except IndexError:
                    raise ValueError(f"Title is required for image {i+1}")
                if not title:
                    raise ValueError(f"Title cannot be empty for image {i+1}")
                
                title, slug, used_titles = make_unique_title_and_slug(title, used_titles)

                description = descriptions[i] if i < len(descriptions) else ""
                keyword_str = keywords_list[i] if i < len(keywords_list) else ""

                try:
                    cloudflare_data = UPLOAD_IMAGES_TO_CLOUDFLARE(
                        image_file, filename=image_file.name
                    )
                except Exception as e:
                    raise ValueError(f"Cloudflare upload failed for {image_file.name}: {str(e)}")
                
                with transaction.atomic():
                    img_obj = Images.objects.create(
                        user=request.user,
                        title=title,
                        slug=slug,
                        description=description,
                        cloudflare_id=cloudflare_data["id"],
                        cloudflare_url=cloudflare_data["url"],
                    )

                    if keyword_str:
                        raw_keywords = [k.strip() for k in keyword_str.split(",") if k.strip()]
                        seen = set()
                        unique_keywords = []
                        for kw in raw_keywords:
                            if kw.lower() not in seen:
                                seen.add(kw.lower())
                                unique_keywords.append(kw)
                        
                        keyword_objs = [Keywords.objects.create(name=kw_name) for kw_name in unique_keywords]
                        if keyword_objs:
                            img_obj.keywords.add(*keyword_objs)

                    created_images.append({
                        "id": img_obj.id,
                        "title": img_obj.title,
                        "slug": img_obj.slug,
                        "status": "success"
                    })

            except Exception as e:
                failed_images.append({
                    "filename": getattr(image_file, "name", f"image_{i+1}"),
                    "error": str(e),
                    "status": "failed"
                })

        return Response({
            "success": True,
            "message": f"{len(created_images)} images uploaded, {len(failed_images)} failed.",
            "uploaded": created_images,
            "failed": failed_images
        }, status=status.HTTP_207_MULTI_STATUS if failed_images else status.HTTP_201_CREATED)

