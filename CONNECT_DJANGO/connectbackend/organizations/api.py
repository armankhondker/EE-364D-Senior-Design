from .models import Project, Skill, TechSkill, ProfSkill, TechCourse, ProfCourse, Intention, \
    Degree, Interest, Logistic, Experience
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
    queryset = TechSkill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TechSkillSerializer


class ProfSkillViewSet(viewsets.ModelViewSet):
    queryset = ProfSkill.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfSkillSerializer


class TechCourseViewSet(viewsets.ModelViewSet):
    queryset = TechCourse.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TechCourseSerializer


class ProfCourseViewSet(viewsets.ModelViewSet):
    queryset = ProfCourse.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProfCourseSerializer


class IntentionViewSet(viewsets.ModelViewSet):
    queryset = Intention.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = IntentionSerializer


class DegreeViewSet(viewsets.ModelViewSet):
    queryset = Degree.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = DegreeSerializer


class InterestViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = InterestSerializer


class LogisticViewSet(viewsets.ModelViewSet):
    queryset = Logistic.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LogisticSerializer


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExperienceSerializer
