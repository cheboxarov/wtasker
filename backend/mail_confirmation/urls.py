from django.urls import path
from .views import MailConfirmationView


urlpatterns = [
    path('mail-confirmation/', MailConfirmationView.as_view(), name='mail-confirmation'),
]