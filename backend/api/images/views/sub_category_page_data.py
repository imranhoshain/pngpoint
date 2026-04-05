from api.images.serializers.sub_category_pagedata import (
    SubCategoryPageContentSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from images.models import SubCategories, SubCategoryPageContent


class SubCategoryPageDataView(APIView):
    def get(self, request, slug):
        try:
            sub_category = SubCategories.objects.get(slug=slug)
        except SubCategories.DoesNotExist:
            return Response(
                {"detail": "SubCategory not found."}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            page_content = sub_category.page_content
        except SubCategoryPageContent.DoesNotExist:
            return Response(
                {}, status=status.HTTP_200_OK
            )  # return empty, frontend uses fallback

        serializer = SubCategoryPageContentSerializer(page_content)
        return Response(serializer.data, status=status.HTTP_200_OK)
