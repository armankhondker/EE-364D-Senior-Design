from rest_framework import serializers
from .models import Matching


# Student Serializer
class MatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matching
        fields = '__all__'
