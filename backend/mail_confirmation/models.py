from django.db import models
from django.contrib.auth import get_user_model
from datetime import timezone, timedelta

User = get_user_model()


class ConfirmationTask(models.Model):
    uid = models.CharField(max_length=50)
    token = models.CharField(max_length=255)
    timestamp_send = models.DateTimeField(auto_now=True)
    timestamp_expired = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

    class Meta:
        indexes = [
            models.Index(fields=['uid', 'token']),
        ]

    def save(self, *args, **kwargs):
        self.timestamp_expired = timezone.now() + timedelta(hours=1)
        return super().save(*args, **kwargs)
