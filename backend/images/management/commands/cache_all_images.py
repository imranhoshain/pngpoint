import time
import json

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

    PROGRESS_KEY = "image_cache_progress"

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
            default=None,
            help="Start from specific chunk number (overrides auto-resume)",
        )
        parser.add_argument(
            "--limit",
            type=int,
            default=None,
            help="Limit total number of images to cache",
        )
        parser.add_argument(
            "--reset-progress",
            action="store_true",
            help="Reset saved progress and start from beginning",
        )
        parser.add_argument(
            "--no-auto-resume",
            action="store_true",
            help="Disable automatic resume from last position",
        )

    def handle(self, *args, **options):
        chunk_size = options["chunk_size"]
        delay = options["delay"]
        timeout = options["timeout"]
        clear_first = options["clear_first"]
        dry_run = options["dry_run"]
        manual_start_from = options["start_from"]
        limit = options["limit"]
        reset_progress = options["reset_progress"]
        no_auto_resume = options["no_auto_resume"]

        self.stdout.write(self.style.SUCCESS("=" * 70))
        self.stdout.write(self.style.SUCCESS("Starting Image Caching Process"))
        self.stdout.write(self.style.SUCCESS("=" * 70))

        # Reset progress if requested
        if reset_progress:
            self._clear_progress()
            self.stdout.write(self.style.WARNING("✓ Progress reset\n"))

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
            self._clear_progress()

        # Get total count
        total_images = Images.objects.count()

        if limit:
            total_images = min(total_images, limit)
            self.stdout.write(self.style.WARNING(f"Limiting to {limit} images"))

        # Determine starting point
        saved_progress = self._get_progress()

        if manual_start_from is not None:
            start_from = manual_start_from
            self.stdout.write(
                self.style.WARNING(f"Manual start specified: chunk {start_from}")
            )
        elif saved_progress and not no_auto_resume:
            start_from = saved_progress.get("last_completed_chunk", 0) + 1
            if start_from > 0:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Resuming from previous run: chunk {start_from} "
                        f"(progress: {saved_progress.get('progress', 0):.1f}%)"
                    )
                )
        else:
            start_from = 0

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
                    f"Starting from chunk {start_from + 1}/{total_chunks}\n"
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

        # Load previous stats if resuming
        if saved_progress and not manual_start_from:
            prev_stats = saved_progress.get("stats", {})
            stats["total"] = prev_stats.get("total", 0)
            stats["cached"] = prev_stats.get("cached", 0)
            stats["skipped"] = prev_stats.get("skipped", 0)
            stats["errors"] = prev_stats.get("errors", 0)

        try:
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
                        elif result == "error":
                            stats["errors"] += 1
                            chunk_errors += 1

                    except Exception as e:
                        stats["errors"] += 1
                        chunk_errors += 1
                        self.stdout.write(
                            self.style.ERROR(
                                f"  ✗ Error caching {image.slug}: {str(e)}"
                            )
                        )

                # Chunk summary
                self.stdout.write(
                    self.style.SUCCESS(
                        f"  ✓ Chunk complete: {chunk_cached} cached, "
                        f"{chunk_skipped} skipped, {chunk_errors} errors"
                    )
                )

                # Save progress after each chunk
                progress_percent = (stats["total"] / total_images) * 100
                self._save_progress(chunk_num, stats, progress_percent, total_chunks)

                # Progress summary
                elapsed = time.time() - stats["start_time"]
                rate = stats["total"] / elapsed if elapsed > 0 else 0
                eta = (total_images - stats["total"]) / rate if rate > 0 else 0

                self.stdout.write(
                    f"  Progress: {progress_percent:.1f}% | "
                    f"Rate: {rate:.1f} img/s | "
                    f"ETA: {self._format_time(eta)}"
                )

                # Delay between chunks to avoid overloading
                if chunk_num < total_chunks - 1:  # Don't delay after last chunk
                    time.sleep(delay)

            # Clear progress on successful completion
            self._clear_progress()

        except KeyboardInterrupt:
            self.stdout.write(
                self.style.WARNING(
                    "\n\n⚠ Process interrupted! Progress has been saved."
                )
            )
            self.stdout.write(
                self.style.SUCCESS(
                    "Run the command again to resume from where you left off.\n"
                )
            )
            return

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"\n\n✗ Error occurred: {str(e)}"))
            self.stdout.write(
                self.style.SUCCESS(
                    "Progress has been saved. Run the command again to resume.\n"
                )
            )
            raise

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
        if total_time > 0:
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
            
            # Verify cache was set successfully
            cached_data = cache.get(cache_key)
            if cached_data is None:
                self.stdout.write(
                    self.style.ERROR(
                        f"  ✗ {image.slug} (cache verification failed) → {cache_key}"
                    )
                )
                return "error"
            
            self.stdout.write(
                f"  ✓ {image.slug} (cached with {len(related_list)} related) → {cache_key}"
            )
        else:
            self.stdout.write(
                f"  ✓ {image.slug} (would cache with {len(related_list)} related)"
            )

        return "cached"

    def _save_progress(self, chunk_num, stats, progress_percent, total_chunks):
        """Save current progress to cache"""
        progress_data = {
            "last_completed_chunk": chunk_num,
            "progress": progress_percent,
            "total_chunks": total_chunks,
            "stats": {
                "total": stats["total"],
                "cached": stats["cached"],
                "skipped": stats["skipped"],
                "errors": stats["errors"],
            },
            "timestamp": time.time(),
        }
        # Store progress with 7 day expiry
        cache.set(self.PROGRESS_KEY, json.dumps(progress_data), 7 * 24 * 60 * 60)

    def _get_progress(self):
        """Retrieve saved progress from cache"""
        progress_json = cache.get(self.PROGRESS_KEY)
        if progress_json:
            try:
                return json.loads(progress_json)
            except json.JSONDecodeError:
                return None
        return None

    def _clear_progress(self):
        """Clear saved progress"""
        cache.delete(self.PROGRESS_KEY)

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