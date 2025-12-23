import time

from api.images.serializers.single_image import SingleImageSerializer
from django.core.cache import cache
from django.core.management.base import BaseCommand

from images.models import Images
from images.services.cloudflare import (
    GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE,
    GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE,
)


class Command(BaseCommand):
    help = "Pre-cache all images for SingleImageView to improve performance"

    def add_arguments(self, parser):
        parser.add_argument(
            "--chunk-size",
            type=int,
            default=100,
            help="Number of images to process in each chunk (default: 100)",
        )
        parser.add_argument(
            "--delay",
            type=float,
            default=0.1,
            help="Delay in seconds between chunks to avoid overloading (default: 0.1)",
        )
        parser.add_argument(
            "--timeout",
            type=int,
            default=None,
            help="Cache timeout in seconds (default: None = never expire)",
        )
        parser.add_argument(
            "--clear-first",
            action="store_true",
            help="Clear all image caches before starting",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Simulate the caching process without actually caching",
        )
        parser.add_argument(
            "--start-from",
            type=int,
            default=0,
            help="Start from specific chunk number (useful for resuming)",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=None,
            help="Limit total number of images to cache",
        )

    def handle(self, *args, **options):
        chunk_size = options["chunk_size"]
        delay = options["delay"]
        timeout = options["timeout"]
        clear_first = options["clear_first"]
        dry_run = options["dry_run"]
        start_from = options["start_from"]
        limit = options["limit"]

        self.stdout.write(self.style.SUCCESS("=" * 70))
        self.stdout.write(self.style.SUCCESS("Starting Image Caching Process"))
        self.stdout.write(self.style.SUCCESS("=" * 70))

        # Clear existing cache if requested
        if clear_first:
            self.stdout.write(self.style.WARNING("Clearing existing image caches..."))
            if not dry_run:
                try:
                    cache.delete_pattern("single_image:*")
                    self.stdout.write(self.style.SUCCESS("✓ Cache cleared"))
                except AttributeError:
                    cache.clear()
                    self.stdout.write(
                        self.style.WARNING(
                            "⚠ Pattern deletion not available, cleared entire cache"
                        )
                    )

        # Get total count
        total_images = Images.objects.count()

        if limit:
            total_images = min(total_images, limit)
            self.stdout.write(self.style.WARNING(f"Limiting to {limit} images"))

        self.stdout.write(f"\nTotal images to cache: {total_images}")
        self.stdout.write(f"Chunk size: {chunk_size}")
        self.stdout.write(f"Delay between chunks: {delay}s")
        if timeout:
            self.stdout.write(f"Cache timeout: {timeout}s")
        else:
            self.stdout.write("Cache timeout: Never expire")
        if dry_run:
            self.stdout.write(
                self.style.WARNING("DRY RUN MODE - No actual caching will occur")
            )
        self.stdout.write("")

        # Calculate chunks
        total_chunks = (total_images + chunk_size - 1) // chunk_size
        start_chunk = start_from

        if start_from > 0:
            self.stdout.write(
                self.style.WARNING(
                    f"Resuming from chunk {start_from + 1}/{total_chunks}"
                )
            )

        # Statistics
        stats = {
            "total": 0,
            "cached": 0,
            "skipped": 0,
            "errors": 0,
            "start_time": time.time(),
        }

        # Process in chunks
        for chunk_num in range(start_chunk, total_chunks):
            offset = chunk_num * chunk_size

            # Apply limit
            remaining = total_images - offset
            current_chunk_size = min(chunk_size, remaining) if limit else chunk_size

            self.stdout.write(
                self.style.HTTP_INFO(
                    f"\n[Chunk {chunk_num + 1}/{total_chunks}] "
                    f"Processing images {offset + 1} to {offset + current_chunk_size}..."
                )
            )

            # Fetch images in this chunk with optimized query
            images = (
                Images.objects.select_related("user", "category", "sub_category")
                .prefetch_related("keywords")
                .order_by("id")[offset : offset + current_chunk_size]
            )

            chunk_cached = 0
            chunk_errors = 0
            chunk_skipped = 0

            for image in images:
                stats["total"] += 1

                try:
                    # Cache this image
                    result = self._cache_single_image(image, timeout, dry_run)

                    if result == "cached":
                        stats["cached"] += 1
                        chunk_cached += 1
                    elif result == "skipped":
                        stats["skipped"] += 1
                        chunk_skipped += 1

                except Exception as e:
                    stats["errors"] += 1
                    chunk_errors += 1
                    self.stdout.write(
                        self.style.ERROR(f"  ✗ Error caching {image.slug}: {str(e)}")
                    )

            # Chunk summary
            self.stdout.write(
                self.style.SUCCESS(
                    f"  ✓ Chunk complete: {chunk_cached} cached, "
                    f"{chunk_skipped} skipped, {chunk_errors} errors"
                )
            )

            # Progress summary
            progress = (stats["total"] / total_images) * 100
            elapsed = time.time() - stats["start_time"]
            rate = stats["total"] / elapsed if elapsed > 0 else 0
            eta = (total_images - stats["total"]) / rate if rate > 0 else 0

            self.stdout.write(
                f"  Progress: {progress:.1f}% | "
                f"Rate: {rate:.1f} img/s | "
                f"ETA: {self._format_time(eta)}"
            )

            # Delay between chunks to avoid overloading
            if chunk_num < total_chunks - 1:  # Don't delay after last chunk
                time.sleep(delay)

        # Final summary
        total_time = time.time() - stats["start_time"]
        self.stdout.write(self.style.SUCCESS("\n" + "=" * 70))
        self.stdout.write(self.style.SUCCESS("Caching Complete!"))
        self.stdout.write(self.style.SUCCESS("=" * 70))
        self.stdout.write(f"\nTotal images processed: {stats['total']}")
        self.stdout.write(self.style.SUCCESS(f"Successfully cached: {stats['cached']}"))
        if stats["skipped"] > 0:
            self.stdout.write(
                self.style.WARNING(f"Skipped (no keywords): {stats['skipped']}")
            )
        if stats["errors"] > 0:
            self.stdout.write(self.style.ERROR(f"Errors: {stats['errors']}"))
        self.stdout.write(f"\nTotal time: {self._format_time(total_time)}")
        self.stdout.write(
            f"Average rate: {stats['total'] / total_time:.2f} images/second"
        )
        self.stdout.write("")

    def _cache_single_image(self, image, timeout, dry_run):
        """
        Cache a single image with its related images.
        Returns: 'cached', 'skipped', or 'error'
        """
        cache_key = f"single_image:{image.slug}"

        # Check if already cached
        if cache.get(cache_key) and not dry_run:
            self.stdout.write(f"  → {image.slug} (already cached)")
            return "cached"

        # Get keywords
        main_keywords = list(image.keywords.all().order_by("id"))

        if not main_keywords:
            self.stdout.write(f"  - {image.slug} (no keywords, skipping)")
            return "skipped"

        first_kw = main_keywords[0]
        first_kw_slug = first_kw.slug

        # Get related images (matching view logic)
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

        # Limit to 50
        related_list = related_list[:50]

        # Serialize
        related_serializer = SingleImageSerializer(related_list, many=True)
        main_image_data = SingleImageSerializer(image).data

        # Add Cloudflare URLs
        if image.cloudflare_id:
            cf_url = GET_SINGLE_IMAGE_URL_FROM_CLOUDFLARE(image.cloudflare_id)
            main_url = GET_SINGLE_MAIN_IMAGE_URL_FROM_CLOUDFLARE(image.cloudflare_id)
            main_image_data["cloudflare_url"] = cf_url
            main_image_data["url"] = cf_url
            main_image_data["main_url"] = main_url

        # Build response data
        response_data = {
            "count": len(related_serializer.data),
            "results": related_serializer.data,
            "image": main_image_data,
            "success": True,
            "message": "Image with related images (based on first keyword) fetched successfully.",
        }

        # Cache the response
        if not dry_run:
            cache.set(cache_key, response_data)
            self.stdout.write(
                f"  ✓ {image.slug} (cached with {len(related_list)} related)"
            )
        else:
            self.stdout.write(
                f"  ✓ {image.slug} (would cache with {len(related_list)} related)"
            )

        return "cached"

    def _format_time(self, seconds):
        """Format seconds into human-readable time"""
        if seconds < 60:
            return f"{seconds:.0f}s"
        elif seconds < 3600:
            minutes = seconds / 60
            return f"{minutes:.1f}m"
        else:
            hours = seconds / 3600
            return f"{hours:.1f}h"
