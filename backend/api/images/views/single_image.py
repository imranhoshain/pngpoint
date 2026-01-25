import logging

from api.images.serializers.single_image import SingleImageSerializer
from api.throttling import (
    BurstRateThrottle,
    PublicEndpointThrottle,
    SustainedRateThrottle,
)
from core.utils import GENERATE_SLUG
from django.core.cache import cache
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from images.models import Images
from images.services.cloudflare import (
    GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE,
    GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE,
)

logger = logging.getLogger(__name__)


class SingleImageView(viewsets.ViewSet):
    permission_classes = [AllowAny]
    renderer_classes = [JSONRenderer]
    throttle_classes = [
        PublicEndpointThrottle,
        BurstRateThrottle,
        SustainedRateThrottle,
    ]

    def retrieve(self, request, slug=None):
        search_term = request.GET.get("search", "")
        keyword_term = request.GET.get("keyword", "")
        cache_key = f"single_image:{slug}"
        logger.info(f"Cache Key: {cache_key}")
        cached_data = cache.get(cache_key)
        if cached_data:
            print(f"Cache HIT for key: {cache_key}")
            cached_data["source"] = "cache"
            cached_data["cache_key"] = cache_key
            return Response(cached_data, status=status.HTTP_200_OK)

        print(f"Cache MISS for key: {cache_key}")
        image = (
            Images.objects.select_related("user", "category", "sub_category")
            .prefetch_related("keywords")
            .filter(slug=slug)
            .first()
        )

        if not image:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        slug_words = slug.split("-")
        print(f"Main image slug words: {slug_words}")
        slug_word_slugs = [word for word in slug_words if word]
        print(f"Slug word slugs for matching: {slug_word_slugs}")

        if not slug_word_slugs:
            response_data = {
                "count": 0,
                "results": [],
                "image": SingleImageSerializer(image).data,
                "success": True,
                "message": "No words found in slug to match keywords.",
            }
            cache.set(cache_key, response_data, 3600)
            return Response(response_data, status=status.HTTP_200_OK)
        related_qs = (
            Images.objects.filter(keywords__slug__in=slug_word_slugs)
            .exclude(pk=image.pk)
            .prefetch_related("keywords")
            .distinct()
            .order_by("-created_at")
        )
        related_with_scores = []
        for img in related_qs:
            img_keyword_slugs = [kw.slug for kw in img.keywords.all()]
            match_count = sum(
                1 for slug_word in slug_word_slugs if slug_word in img_keyword_slugs
            )

            if match_count > 0:
                related_with_scores.append((img, match_count))
        related_with_scores.sort(key=lambda x: (-x[1], -x[0].created_at.timestamp()))
        related_list = [img for img, _ in related_with_scores]
        related_list = related_list[:50]
        if search_term or keyword_term:
            slugs_to_match = []
            if search_term:
                slugs_to_match.append(GENERATE_SLUG(search_term))
            if keyword_term:
                slugs_to_match.append(GENERATE_SLUG(keyword_term))
            related_list = [
                img
                for img in related_list
                if any(kw.slug in slugs_to_match for kw in img.keywords.all())
            ]
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
            "message": "Image with related images (sorted by keyword match count) fetched successfully.",
        }
        cache.set(cache_key, response_data, 3600)
        print(f"Response cached with key: {cache_key}")

        return Response(response_data, status=status.HTTP_200_OK)
