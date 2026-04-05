from rest_framework import serializers

from images.models import SubCategoryPageContent


class SubCategoryPageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategoryPageContent
        fields = [
            "meta_title",
            "meta_description",
            "intro_heading",
            "intro_paragraph_1",
            "intro_paragraph_2",
            "seo_heading",
            "seo_paragraph_1",
            "seo_paragraph_2",
            "seo_paragraph_3",
            "popular_uses_heading",
            "popular_uses",
            "pagination_text_template",
            "faq_heading",
            "faqs",
        ]
