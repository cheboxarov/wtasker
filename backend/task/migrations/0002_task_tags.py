# Generated by Django 5.1.1 on 2024-09-29 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("task", "0001_initial"),
        ("task_tags", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="tags",
            field=models.ManyToManyField(to="task_tags.tasktag"),
        ),
    ]
