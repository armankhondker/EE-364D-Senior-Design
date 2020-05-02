from rest_framework import serializers
from .models import Settings


# Student Serializer
class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = '__all__'
