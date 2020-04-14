from .models import Student, Resume
from rest_framework import viewsets, permissions
from .serializers import StudentSerializer, ResumeSerializer


# Student Viewset
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = StudentSerializer


class ResumeViewSet(viewsets.ModelViewSet):
    queryset = Resume.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ResumeSerializer
