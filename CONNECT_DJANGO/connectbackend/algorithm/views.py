from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .match_algorithm import run


class MatchAlgo(APIView):
    def get(self, request, format=None):
        run()
        return Response('Hello')
