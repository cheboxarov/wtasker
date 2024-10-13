from rest_framework import serializers
from .models import Task
from task_tags.serializers import EmbTaskTagsSerializer
from task_tags.models import TaskTag


class TaskDetailSerializer(serializers.ModelSerializer):

    tags = EmbTaskTagsSerializer(many=True, required=False)

    class Meta:

        model = Task
        fields = "__all__"
        read_only_fields = ["id", "user"]

    def validate(self, attrs):
        attrs.pop('tags', None)  
        return attrs

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        tags_data = self.initial_data.get("tags", [])
        
        task = Task.objects.create(**validated_data)

        print(tags_data)

        for tag_data in tags_data:
            tag_id = tag_data.get("id")
            if tag_id is not None:
                try:
                    tag = TaskTag.objects.get(id=tag_id)
                    task.tags.add(tag)
                    continue
                except TaskTag.DoesNotExist:
                    raise serializers.ValidationError({"tags": f"Tag with id {tag_id} does not exist."})
            tag_data["user"] = user.id 
            tag_serializer = EmbTaskTagsSerializer(data=tag_data)
            tag_serializer.is_valid(raise_exception=True)
            tag = tag_serializer.save() 
            task.tags.add(tag)
        return task
