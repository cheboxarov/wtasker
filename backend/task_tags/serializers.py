from rest_framework import serializers
from .models import TaskTag


class EmbTaskTagsSerializer(serializers.ModelSerializer):

    class Meta:

        model = TaskTag
        fields = "__all__"
        extra_kwargs = {
            'user': {'required': False},
            'content': {'required': False},
            'color': {'required': False}
        }


class TaskTagsSerializer(serializers.ModelSerializer):

    class Meta:

        model = TaskTag
        fields = "__tags__"
        read_only_fields = ("user",)

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)