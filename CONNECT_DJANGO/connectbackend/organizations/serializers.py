from rest_framework import serializers
from .models import Project, Skill, TechSkill, ProfSkill, TechCourse, ProfCourse, Intention, \
    Degree, Interest, Logistic, Experience


# Student Serializer
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'


class TechSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechSkill
        fields = '__all__'


class ProfSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfSkill
        fields = '__all__'


class TechCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechCourse
        fields = '__all__'


class ProfCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfCourse
        fields = '__all__'


class IntentionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intention
        fields = '__all__'


class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = '__all__'


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'


class LogisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logistic
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


