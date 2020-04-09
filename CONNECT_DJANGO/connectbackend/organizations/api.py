from .models import Project, Skill
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer, SkillSerializer, TechSkillSerializer, ProfSkillSerializer,\
    TechCourseSerializer, ProfCourseSerializer, IntentionSerializer, DegreeSerializer, InterestSerializer,\
    LogisticSerializer, ExperienceSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProjectSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SkillSerializer


class TechSkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TechSkillSerializer


class ProfSkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfSkillSerializer


class TechCourseViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TechCourseSerializer


class ProfCourseViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfCourseSerializer


class IntentionViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = IntentionSerializer


class DegreeViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DegreeSerializer


class InterestViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = InterestSerializer


class LogisticViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LogisticSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExperienceSerializer
