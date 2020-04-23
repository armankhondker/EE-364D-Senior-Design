from rest_framework import serializers
from .models import Project, Skill, TechSkill, ProfSkill, TechCourse, ProfCourse, Intention, \
    Degree, Interest, Logistic, Experience


# Student Serializer
class ProjectSerializer(serializers.ModelSerializer):
    project_categories = serializers.SerializerMethodField()
    degree = serializers.SerializerMethodField()
    tech_courses = serializers.SerializerMethodField()
    prof_courses = serializers.SerializerMethodField()
    experience = serializers.SerializerMethodField()
    tech_skills = serializers.SerializerMethodField()
    prof_skills = serializers.SerializerMethodField()
    class Meta:
        model = Project
        fields = '__all__'

    def get_project_categories(self, obj):
        return obj.project_categories

    def get_degree(self, obj):
        return obj.degree

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


