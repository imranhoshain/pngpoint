from api.images.serializers.sub_category_pagedata import (
    SubCategoryPageContentSerializer,
)
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from images.models import SubCategories, SubCategoryPageContent


class SubCategoryPageDataView(APIView):
    permission_classes = [AllowAny]

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
            return Response({}, status=status.HTTP_200_OK)

        serializer = SubCategoryPageContentSerializer(page_content)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, slug):
        try:
            sub_category = SubCategories.objects.get(slug=slug)
        except SubCategories.DoesNotExist:
            return Response(
                {"detail": "SubCategory not found."}, status=status.HTTP_404_NOT_FOUND
            )

        # If page content already exists, return conflict
        if SubCategoryPageContent.objects.filter(sub_category=sub_category).exists():
            return Response(
                {"detail": "Page content already exists. Use PUT to update."},
                status=status.HTTP_409_CONFLICT,
            )

        serializer = SubCategoryPageContentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(sub_category=sub_category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, slug):
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
                {"detail": "Page content not found. Use POST to create."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = SubCategoryPageContentSerializer(
            page_content, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)