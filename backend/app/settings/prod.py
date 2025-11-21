#########################################################
"""
Production settings configuration
"""
#########################################################
import os
from datetime import timedelta
from app.settings.base import *

DEBUG = False

ALLOWED_HOSTS = ["*"]
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST'),
        'PORT': os.getenv('POSTGRES_PORT'),
        'OPTIONS': {
            'sslmode': os.getenv('POSTGRES_SSLMODE', 'disable'),
        },
    }
}

CSRF_TRUSTED_ORIGINS = [
    'https://pngpoint.com',
    'https://www.pngpoint.com',
]

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(days=365)
SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] = timedelta(days=365)
