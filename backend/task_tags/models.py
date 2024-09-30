from django.db import models


class TaskTag(models.Model):
    content = models.CharField(max_length=30)
    color = models.CharField(max_length=10)
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.content