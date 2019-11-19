from rest_framework import serializers
from .models import Project


# Student Serializer
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
