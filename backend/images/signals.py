from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from images.models import Images

CACHE_PREFIX = "img_slug:"

@receiver(post_save, sender=Images)
def update_image_cache(sender, instance, created, **kwargs):
    if instance.status == "approved" and created:
        cache_key = f"{CACHE_PREFIX}{instance.slug}"
        data = {
            "slug": instance.slug,
            "updatedAt": instance.updated_at.isoformat() if instance.updated_at else None
        }
        cache.set(cache_key, data, timeout=86400)
        print(f"Cache Updated for: {instance.slug}")

@receiver(post_delete, sender=Images)
def delete_image_cache(sender, instance, **kwargs):
    cache_key = f"{CACHE_PREFIX}{instance.slug}"
    cache.delete(cache_key)
    print(f"Cache Deleted for: {instance.slug}")