from rest_framework import routers
from .api import MatchingViewSet, ResultViewSet


router = routers.DefaultRouter()
router.register('api/matchings', MatchingViewSet, 'matchings')
router.register('api/results', ResultViewSet, 'results')
urlpatterns = router.urls
