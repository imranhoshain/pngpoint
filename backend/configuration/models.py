from django.db import models
from django_cryptography.fields import encrypt

class CloudflareConfig(models.Model):
    api_key = encrypt(models.CharField(max_length=255))
    account_id = encrypt(models.CharField(max_length=255))
    account_hash = encrypt(models.CharField(max_length=255))
    images_domain = models.CharField(max_length=255)
    email = models.EmailField()
    endpoint = models.CharField(max_length=100, default="verify")
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.pk and CloudflareConfig.objects.exists():
            CloudflareConfig.objects.all().delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return "Cloudflare Configuration"
