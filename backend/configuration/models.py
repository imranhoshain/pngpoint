from django.db import models
from encrypted_model_fields.fields import EncryptedCharField, EncryptedEmailField

class CloudflareConfig(models.Model):
    api_key = EncryptedCharField(max_length=255)
    account_id = EncryptedCharField(max_length=255)
    account_hash = EncryptedCharField(max_length=255)
    images_domain = models.CharField(max_length=255)
    email = EncryptedEmailField()
    endpoint = models.CharField(max_length=100, default="verify")
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.pk and CloudflareConfig.objects.exists():
            CloudflareConfig.objects.all().delete()
        super().save(*args, **kwargs)

    def __str__(self):
        return "Cloudflare Configuration"
