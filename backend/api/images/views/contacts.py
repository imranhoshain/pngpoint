from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from api.images.serializers.contacts import ContactSerializer
from images.models import Contact
from rest_framework.permissions import AllowAny


class ContactListCreateAPIView(ListCreateAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact = serializer.save()

        try:
            send_mail(
                subject=f"New Contact Message: {contact.subject}",
                message=(
                    f"You have received a new contact form submission.\n\n"
                    f"Name: {contact.name}\n"
                    f"Email: {contact.email}\n"
                    f"Subject: {contact.subject}\n\n"
                    f"Message:\n{contact.message}"
                ),
                from_email='robiulcc@gmail.com',
                recipient_list=['osmangoni255@gmail.com'],
                fail_silently=False,
            )
        except Exception as e:
            return Response(
                {"detail": f"Contact saved but failed to send email: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)