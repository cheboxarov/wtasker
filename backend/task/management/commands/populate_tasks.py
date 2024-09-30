from django.core.management.base import BaseCommand
from django.utils import timezone
from task.models import Task
from task_tags.models import TaskTag
from random import randint, choice
import faker

class Command(BaseCommand):
    help = 'Create a specified number of tasks with random tags'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int, help='Indicates the number of tasks to create')

    def handle(self, *args, **kwargs):
        count = kwargs['count']
        fake = faker.Faker()
        created_tasks = []

        # Получаем существующие теги для случайного выбора
        existing_tags = list(TaskTag.objects.all())
        total_tags = len(existing_tags)

        for _ in range(count):
            task = Task(
                title=fake.sentence(),
                description=fake.text(),
                due_date=fake.date_between(start_date='today', end_date='+30d'),
                is_done=randint(0, 1) == 1,
                in_backlog=True,
                user_id=1  # Укажите ID пользователя, который будет создателем задач
            )
            created_tasks.append(task)

        # Пакетное создание задач
        Task.objects.bulk_create(created_tasks)

        # Добавление тегов к задачам
        for task in created_tasks:
            # Определяем случайное количество тегов (от 1 до 5)
            num_tags = randint(1, 5)

            # Генерируем случайные теги
            if randint(0,1):
                random_existing_tags = [choice(existing_tags) for _ in range(num_tags)]
                for tag in random_existing_tags:
                    task.tags.add(tag)
            else:
                # Если тегов не существует, создаем новые
                for _ in range(num_tags):
                    new_tag = TaskTag(
                        content=fake.word(),
                        color=fake.color_name(),
                        user_id=1  # Укажите ID пользователя, который будет создателем тегов
                    )
                    new_tag.save()
                    task.tags.add(new_tag)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {count} tasks with random tags.'))
