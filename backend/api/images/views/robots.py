"""
Robots.txt View
Create this in your app's views.py or create a new file like robots_view.py
"""

from django.http import HttpResponse
from django.views.decorators.http import require_GET


@require_GET
def robots_txt(request):
    """
    Generates robots.txt file dynamically
    Disallows /user and /dashboard paths
    """
    lines = [
        "User-agent: *",
        "Disallow: /user/",
        "Disallow: /dashboard/",
        "Disallow: /admin/",
        "Disallow: /api/",
        "Disallow: /media/private/",
        "",
        "# Allow crawling of images",
        "Allow: /image/",
        "Allow: /categories/",
        "Allow: /sub-categories/",
        "",
        "# Sitemap location",
        "Sitemap: https://pngpoint.com/api/v1/sitemap.xml",
        "",
        "# Crawl-delay for polite crawling",
        "Crawl-delay: 1",
    ]
    
    return HttpResponse("\n".join(lines), content_type="text/plain")