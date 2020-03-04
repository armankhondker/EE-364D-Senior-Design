from .models import Matching
from .serializers import MatchingSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class MatchResults(APIView):
    """
    List all matches or create a new matching
    """
    def get(self, request, *args, **kwargs):
        matches = Matching.objects.all()
        serializer = MatchingSerializer(matches, many=True)
        return Response(serializer.data)
