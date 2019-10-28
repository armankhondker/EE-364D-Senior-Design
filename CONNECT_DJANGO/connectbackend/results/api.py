from .models import Matching
from rest_framework import viewsets, permissions
from .serializers import MatchingSerializer


# Student Viewset
class MatchingViewSet(viewsets.ModelViewSet):
    queryset = Matching.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MatchingSerializer
