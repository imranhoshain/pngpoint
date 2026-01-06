from django.contrib.sitemaps import Sitemap
from django.contrib.sites.models import Site
from django.core.cache import cache
from django.db.models import F
from .models import Images, Categories, SubCategories
from datetime import datetime, timedelta


class CachedSitemap(Sitemap):
    """Base sitemap class with caching support"""
    cache_timeout = 3600  # 1 hour
    
    def get_urls(self, page=1, site=None, protocol=None):
        """Override to force correct domain"""
        try:
            site = Site.objects.get(id=1)
            if site.domain == 'example.com':
                site.domain = 'pngpoint.com'
                site.save()
        except Site.DoesNotExist:
            site = Site.objects.create(
                id=1,
                domain='pngpoint.com',
                name='PNG Point'
            )
        
        # Use https protocol
        protocol = protocol or 'https'
        
        return super().get_urls(page=page, site=site, protocol=protocol)
    
    def get_cache_key(self):
        """Generate cache key for this sitemap"""
        return f'sitemap_{self.__class__.__name__}'
    
    def items(self):
        """Override this in child classes"""
        # cache_key = self.get_cache_key()
        # items = cache.get(cache_key)
        
        # if items is None:
        #     items = self._get_items()
        #     cache.set(cache_key, items, self.cache_timeout)
        
        return self._get_items()
    
    def _get_items(self):
        """Implement this in child classes"""
        raise NotImplementedError


class OptimizedImageSitemap(CachedSitemap):
    """
    Optimized sitemap for images with database query optimization
    """
    changefreq = "weekly"
    priority = 0.8
    limit = 5000
    protocol = 'https'
    
    def _get_items(self):
        """
        Only select necessary fields to reduce memory usage
        Use select_related for foreign keys if needed
        """
        return Images.objects.filter(
            status='approved'
        ).only(
            'slug', 'updated_at', 'download_count'
        ).order_by('-created_at')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return f'/image/{obj.slug}'
    
    def priority(self, obj):
        """Dynamic priority based on download count"""
        if obj.download_count > 1000:
            return 0.9
        elif obj.download_count > 100:
            return 0.8
        else:
            return 0.7


class RecentImagesSitemap(CachedSitemap):
    """
    Sitemap for images added in the last 30 days
    Higher priority and more frequent updates
    """
    changefreq = "daily"
    priority = 0.9
    limit = 5000
    protocol = 'https'
    cache_timeout = 1800
    
    def _get_items(self):
        thirty_days_ago = datetime.now() - timedelta(days=30)
        return Images.objects.filter(
            status='approved',
            created_at__gte=thirty_days_ago
        ).only(
            'slug', 'updated_at', 'created_at'
        ).order_by('-created_at')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return f'/image/{obj.slug}'


class PopularImagesSitemap(CachedSitemap):
    """
    Sitemap for most downloaded images
    """
    changefreq = "daily"
    priority = 0.95
    limit = 5000
    protocol = 'https'
    cache_timeout = 1800
    
    def _get_items(self):
        return Images.objects.filter(
            status='approved',
            download_count__gt=0
        ).only(
            'slug', 'updated_at', 'download_count'
        ).order_by('-download_count')[:5000]
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return f'/image/{obj.slug}'


class CategorySitemap(CachedSitemap):
    """Sitemap for category pages"""
    changefreq = "weekly"
    priority = 0.7
    protocol = 'https'
    
    def _get_items(self):
        return Categories.objects.all().only('slug')
    
    def location(self, obj):
        return f'/categories/{obj.slug}'


class SubCategorySitemap(CachedSitemap):
    """Sitemap for subcategory pages"""
    changefreq = "weekly"
    priority = 0.6
    protocol = 'https'
    
    def _get_items(self):
        return SubCategories.objects.all().only('slug')
    
    def location(self, obj):
        return f'/sub-categories/{obj.slug}'


class StaticViewSitemap(Sitemap):
    """Sitemap for static pages"""
    priority = 1.0
    changefreq = 'daily'
    protocol = 'https'
    
    def get_urls(self, page=1, site=None, protocol=None):
        """Override to force correct domain"""
        try:
            site = Site.objects.get(id=1)
            if site.domain == 'example.com':
                site.domain = 'pngpoint.com'
                site.save()
        except Site.DoesNotExist:
            site = Site.objects.create(
                id=1,
                domain='pngpoint.com',
                name='PNG Point'
            )
        
        protocol = protocol or 'https'
        return super().get_urls(page=page, site=site, protocol=protocol)

    def items(self):
        return ['home','about', 'contact', 'privacy', 'terms','license']

    def location(self, item):
        if item == 'home':
            return '/'
        return f'/{item}/'