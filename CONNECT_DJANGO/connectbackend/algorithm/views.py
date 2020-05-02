from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .match_algorithm import run_algo
import json


class MatchAlgo(APIView):
    def post(self, request, format=None):
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        pre_matches = body_data["data"]
        email_address = body_data["email_address"]
        run_algo(pre_matches, email_address)
        return Response("Success")
