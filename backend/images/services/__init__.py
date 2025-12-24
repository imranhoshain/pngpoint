from images.tasks import _delete_all_cache_variations


def cache_delete_for_cloudflare(slug):
    _delete_all_cache_variations(slug)
