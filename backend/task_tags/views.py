from rest_framework.viewsets import ModelViewSet
from .models import TaskTag
from .serializers import TaskTagsSerializer


# class TaskTagViewSet(ModelViewSet):

#     queryset = TaskTag.objects.select_related("user").all()
#     serializer_class = 