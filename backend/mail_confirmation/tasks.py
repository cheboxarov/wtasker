from celery import shared_task
from services.mail import send_activation_email


@shared_task()
def confirmation_email(user):
    return send_activation_email(user)
