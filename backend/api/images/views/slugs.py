from django.http import JsonResponse
from django.core.cache import cache
from images.models import Images

def get_image_slugs(request):
    prefix = "img_slug:"
    keys = cache.keys(f"{prefix}*")
    
    if not keys:
        images = Images.objects.filter(status="approved").values('slug', 'updated_at')
        slugs_data = []
        
        for img in images:
            data = {
                "slug": img['slug'],
                "updatedAt": img['updated_at'].isoformat() if img['updated_at'] else None
            }
            cache.set(f"{prefix}{img['slug']}", data)
            slugs_data.append(data)
        
        print("Cache Populated from DB")
        return JsonResponse(slugs_data, safe=False)
    
    cached_dict = cache.get_many(keys)
    return JsonResponse(list(cached_dict.values()), safe=False)