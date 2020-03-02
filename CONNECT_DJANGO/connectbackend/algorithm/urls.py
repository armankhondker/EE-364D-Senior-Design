from django.urls import path
from .views import MatchAlgo

urlpatterns = [
    path('api/algo', MatchAlgo.as_view(), name='algo'),
]
