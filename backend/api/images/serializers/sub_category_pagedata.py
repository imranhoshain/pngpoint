# serializers/sub_category_pagedata.py

from rest_framework import serializers
from images.models import SubCategoryPageContent


class SubCategoryPageContentSerializer(serializers.ModelSerializer):
    sub_category = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = SubCategoryPageContent
        fields = [
            'sub_category',
            'meta_title',
            'meta_description',
            'intro_heading',
            'intro_paragraph_1',
            'intro_paragraph_2',
            'seo_heading',
            'seo_paragraph_1',
            'seo_paragraph_2',
            'seo_paragraph_3',
            'popular_uses_heading',
            'popular_uses',
            'pagination_text_template',
            'faq_heading',
            'faqs',
        ]