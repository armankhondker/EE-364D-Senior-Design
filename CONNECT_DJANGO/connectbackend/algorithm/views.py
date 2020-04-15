from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .match_algorithm import run


class MatchAlgo(APIView):
    def post(self, request, format=None):
        pre_matches = request.POST.get("data")
        email_address = request.POST.get("email_address")
        run_algo(pre_matches, email_address)
        return Response("Success")
