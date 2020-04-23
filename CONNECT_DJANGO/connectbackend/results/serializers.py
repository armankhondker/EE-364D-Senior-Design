from rest_framework import serializers
from .models import Matching, Result


# Student Serializer
class MatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matching
        fields = '__all__'


class ResultSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()

    class Meta:
        model = Result
        fields = '__all__'

    def get_data(self, obj):
        return obj.data
