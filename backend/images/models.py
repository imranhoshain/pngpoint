from core.utils import GENERATE_SLUG
from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models

from images.utils.status import STATUS_CHOICES


class Categories(models.Model):
    name = models.CharField(
        max_length=180,
        db_index=True,
        unique=True,
    )
    icon = models.ImageField(
        upload_to="categories/",
        null=True,
        blank=True,
    )
    slug = models.SlugField(
        max_length=180,
        db_index=True,
        editable=False,
        unique=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = GENERATE_SLUG(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class SubCategories(models.Model):
    name = models.CharField(
        max_length=180,
        db_index=True,
        unique=True,
    )
    icon = models.ImageField(
        upload_to="sub-category/",
        null=True,
        blank=True,
    )
    categories = models.ForeignKey(
        Categories, on_delete=models.CASCADE, related_name="sub_categories"
    )
    slug = models.SlugField(
        max_length=180,
        db_index=True,
        editable=False,
        unique=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = GENERATE_SLUG(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Keywords(models.Model):
    name = models.CharField(
        max_length=180, validators=[MinLengthValidator(3)], db_index=True
    )
    slug = models.SlugField(max_length=180, db_index=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = GENERATE_SLUG(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Images(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user",
    )
    cloudflare_id = models.CharField(
        max_length=500, unique=True, db_index=True, null=True, blank=True
    )
    name = models.CharField(
        max_length=1000, unique=True, db_index=True, null=True, blank=True
    )
    cloudflare_url = models.URLField(
        unique=True, db_index=True, max_length=2000, null=True, blank=True
    )
    title = models.CharField(
        max_length=500, blank=True, null=True, db_index=True, unique=True
    )
    slug = models.SlugField(unique=True, max_length=500, editable=False)
    description = models.TextField(max_length=5000, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    download_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    keywords = models.ManyToManyField(Keywords, related_name="images", blank=True)

    category = models.ForeignKey(
        Categories,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="images",
    )
    sub_category = models.ForeignKey(
        SubCategories,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="images",
    )
    sequence = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug and self.title:
            self.slug = GENERATE_SLUG(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title if self.title else "Image added"


class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    subject = models.CharField(max_length=500)
    message = models.TextField()


class SubCategoryPageContent(models.Model):
    sub_category = models.OneToOneField(
        SubCategories,  # replace with your actual SubCategory model reference
        on_delete=models.CASCADE,
        related_name="page_content",
    )
    # Meta
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    # Top Intro
    intro_heading = models.CharField(max_length=255, blank=True)  # h1
    intro_paragraph_1 = models.TextField(blank=True)
    intro_paragraph_2 = models.TextField(blank=True)

    # Bottom SEO Content
    seo_heading = models.CharField(max_length=255, blank=True)  # h2
    seo_paragraph_1 = models.TextField(blank=True)
    seo_paragraph_2 = models.TextField(blank=True)
    seo_paragraph_3 = models.TextField(blank=True)
    popular_uses_heading = models.CharField(max_length=255, blank=True)  # h3
    popular_uses = models.JSONField(default=list, blank=True)  # list of strings

    # Pagination text (dynamic, generated on frontend using this template)
    pagination_text_template = models.TextField(
        blank=True,
        help_text="Use {page} and {name} as placeholders. E.g. You're browsing page {page} of our {name} PNG collection.",
    )

    # FAQ
    faq_heading = models.CharField(
        max_length=255, blank=True, default="Frequently Asked Questions (FAQ)"
    )
    faqs = models.JSONField(
        default=list,
        blank=True,
        help_text='List of {"question": "...", "answer": "..."} objects',
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Page Content - {self.sub_category}"
