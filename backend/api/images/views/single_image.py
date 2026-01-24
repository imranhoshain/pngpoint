import logging
from django.core.cache import cache
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from images.models import Images
from api.images.serializers.single_image import SingleImageSerializer
from images.services.cloudflare import (
    GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE,
    GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE
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

        # ---------------- EXTRACT WORDS FROM MAIN IMAGE SLUG ----------------
        # Split slug by hyphen to get individual words
        slug_words = slug.split('-')
        print(f"Main image slug words: {slug_words}")
        
        # Convert slug words to keyword slugs for matching
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

        # ---------------- RELATED IMAGES (keyword slug matches any word from main image slug) ----------------
        # Get images that have keywords matching any of the slug words
        related_qs = (
            Images.objects.filter(keywords__slug__in=slug_word_slugs)
            .exclude(pk=image.pk)
            .prefetch_related("keywords")
            .distinct()
            .order_by("-created_at")
        )

        # Filter to keep only images where at least one keyword matches our slug words
        related_list = []
        for img in related_qs:
            img_keywords = list(img.keywords.all())
            # Check if any keyword from this image matches any word from main image slug
            if any(kw.slug in slug_word_slugs for kw in img_keywords):
                related_list.append(img)

        # Limit to 50
        related_list = related_list[:50]

        # ---------------- OPTIONAL SEARCH / KEYWORD FILTERS (OR) ----------------
        if search_term or keyword_term:
            slugs_to_match = []
            if search_term:
                slugs_to_match.append(GENERATE_SLUG(search_term))
            if keyword_term:
                slugs_to_match.append(GENERATE_SLUG(keyword_term))

            # Keep images if any keyword slug matches any of the search/keyword slugs
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
            "message": "Image with related images (based on slug word matching) fetched successfully.",
        }

        # ---------------- CACHE THE RESPONSE ----------------
        # Cache for 1 hour (3600 seconds)
        cache.set(cache_key, response_data, 3600)
        print(f"Response cached with key: {cache_key}")

        return Response(response_data, status=status.HTTP_200_OK)