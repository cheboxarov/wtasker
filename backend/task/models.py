from django.db import models


class Task(models.Model):

    title = models.CharField(max_length=100, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание", null=True, blank=True)
    is_done = models.BooleanField(default=False, verbose_name="Выполнена")
    due_date = models.DateField(verbose_name="Дедлайн", null=True, blank=True)
    in_backlog = models.BooleanField(default=True, verbose_name="В бэклоге")
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, verbose_name="Юзер")
    tags = models.ManyToManyField("task_tags.TaskTag", verbose_name="Теги")

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"
