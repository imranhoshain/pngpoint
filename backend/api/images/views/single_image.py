import logging
from django.db.models import Prefetch
from django.core.cache import cache
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from images.models import Images
from api.images.serializers.single_image import SingleImageSerializer
from images.services.cloudflare import (
    GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE,
    GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE,
)
from core.utils import GENERATE_SLUG
from api.throttling import PublicEndpointThrottle, BurstRateThrottle, SustainedRateThrottle

logger = logging.getLogger(__name__)

class SingleImageView(viewsets.ViewSet):
    permission_classes = [AllowAny]
    renderer_classes = [JSONRenderer]
    throttle_classes = [PublicEndpointThrottle, BurstRateThrottle, SustainedRateThrottle]

    def retrieve(self, request, slug=None):
        # ---------------- BUILD CACHE KEY ----------------
        search_term = request.GET.get("search", "")
        keyword_term = request.GET.get("keyword", "")
        
        # Create a unique cache key based on slug and query parameters
        cache_key = f"single_image:{slug}"
        logger.info(f"Cache Key: {cache_key}")
        
        # ---------------- CHECK CACHE ----------------
        cached_data = cache.get(cache_key)
        if cached_data:
            print(f"Cache HIT for key: {cache_key}")
            cached_data["source"] = "cache"
            cached_data["cache_key"] = cache_key
            return Response(cached_data, status=status.HTTP_200_OK)
        
        print(f"Cache MISS for key: {cache_key}")
        
        # ---------------- MAIN IMAGE ----------------
        image = Images.objects.select_related(
            'user', 'category', 'sub_category'
        ).prefetch_related("keywords").filter(slug=slug).first()
        
        if not image:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        # ---------------- MAIN IMAGE KEYWORDS ----------------
        main_keywords = list(image.keywords.all().order_by("id"))
        if not main_keywords:
            response_data = {
                "count": 0,
                "results": [],
                "image": SingleImageSerializer(image).data,
                "success": True,
                "message": "No keywords found for this image.",
            }
            # Cache for 1 hour (3600 seconds)
            cache.set(cache_key, response_data)
            return Response(response_data, status=status.HTTP_200_OK)

        first_kw = main_keywords[0]
        first_kw_slug = first_kw.slug
        print(f"Main image first keyword: {first_kw.name} ({first_kw_slug})")

        # ---------------- RELATED IMAGES (first keyword match) ----------------
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

        # limit to 50
        related_list = related_list[:50]

        # ---------------- OPTIONAL SEARCH / KEYWORD FILTERS (OR) ----------------
        if search_term or keyword_term:
            slugs_to_match = []
            if search_term:
                slugs_to_match.append(GENERATE_SLUG(search_term))
            if keyword_term:
                slugs_to_match.append(GENERATE_SLUG(keyword_term))

            # keep images if any keyword slug matches any of the slugs
            related_list = [
                img for img in related_list
                if any(kw.slug in slugs_to_match for kw in img.keywords.all())
            ]

        # ---------------- SERIALIZE ----------------
        related_serializer = SingleImageSerializer(related_list, many=True)
        main_image_data = SingleImageSerializer(image).data

        # ---------------- CLOUDFLARE URLS ----------------
        if image.cloudflare_id:
            cf_url = GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE(image.cloudflare_id)
            main_url = GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE(image.cloudflare_id)
            main_image_data["cloudflare_url"] = cf_url
            main_image_data["url"] = cf_url
            main_image_data["main_url"] = main_url

        # ---------------- RESPONSE ----------------
        response_data = {
            "count": len(related_serializer.data),
            "results": related_serializer.data,
            "image": main_image_data,
            "success": True,
            "message": "Image with related images (based on first keyword and optional search/keyword) fetched successfully.",
        }

        # ---------------- CACHE THE RESPONSE ----------------
        # Cache for 1 hour (3600 seconds) - adjust timeout as needed
        cache.set(cache_key, response_data)
        print(f"Response cached with key: {cache_key}")

        return Response(response_data, status=status.HTTP_200_OK)