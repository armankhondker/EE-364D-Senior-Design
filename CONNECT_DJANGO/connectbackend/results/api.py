from .models import Matching, Result
from rest_framework import viewsets, permissions
from .serializers import MatchingSerializer, ResultSerializer


# Student Viewset
class MatchingViewSet(viewsets.ModelViewSet):
    queryset = Matching.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MatchingSerializer


class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ResultSerializer
