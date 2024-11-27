from rest_framework.viewsets import ModelViewSet
from .models import Task
from .serializers import TaskDetailSerializer
from rest_framework.permissions import IsAuthenticated


class TaskViewSet(ModelViewSet):

    queryset = Task.objects.select_related("user").prefetch_related("tags").all()
    serializer_class = TaskDetailSerializer 
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)
    