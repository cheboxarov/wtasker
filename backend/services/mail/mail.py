from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.urls import reverse_lazy
from django.utils.encoding import force_bytes
from mail_confirmation.models import ConfirmationTask

User = get_user_model()


def send_activation_email(user: User):
    current_site = "wtasker.wlovem.ru"
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_url = reverse_lazy('confirm_email', kwargs={'uidb64': uid, 'token': token})
    subject = 'Activate your account'
    message = f"""Подтвердите ваш аккаунт!
    Ссылка: https://{current_site}{activation_url}"""
    result = user.email_user(subject, message)
    ConfirmationTask.objects.create(uid, token, user=user)
    return result
