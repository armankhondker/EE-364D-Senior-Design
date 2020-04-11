from .models import Settings
from rest_framework import viewsets, permissions
from .serializers import SettingsSerializer


# Student Viewset
class SettingsViewSet(viewsets.ModelViewSet):
    queryset = Settings.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SettingsSerializer