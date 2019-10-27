from rest_framework import routers
from .api import MatchingViewSet


router = routers.DefaultRouter()
router.register('api/matchings', MatchingViewSet, 'matchings')

urlpatterns = router.urls
