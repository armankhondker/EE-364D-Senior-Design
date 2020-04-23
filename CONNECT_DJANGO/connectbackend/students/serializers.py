from rest_framework import serializers
from .models import Student, Resume


# Student Serializer
class StudentSerializer(serializers.ModelSerializer):
    intentions = serializers.SerializerMethodField()
    interests = serializers.SerializerMethodField()
    tech_courses = serializers.SerializerMethodField()
    prof_courses = serializers.SerializerMethodField()
    experience = serializers.SerializerMethodField()
    tech_skills = serializers.SerializerMethodField()
    prof_skills = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = '__all__'

    def get_intentions(self, obj):
        return obj.intentions

    def get_interests(self, obj):
        return obj.interests

    def get_tech_courses(self, obj):
        return obj.tech_courses

    def get_prof_courses(self, obj):
        return obj.prof_courses

    def get_experience(self, obj):
        return obj.experience

    def get_tech_skills(self, obj):
        return obj.tech_skills

    def get_prof_skills(self, obj):
        return obj.prof_skills


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'


