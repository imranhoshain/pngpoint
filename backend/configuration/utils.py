from configuration.models import CloudflareConfig

def get_cloudflare_config():
    config = CloudflareConfig.objects.first()
    if config:
        return config
    raise Exception("Cloudflare config not found.")
