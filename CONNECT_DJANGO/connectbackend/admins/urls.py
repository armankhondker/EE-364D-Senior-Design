from rest_framework import routers
from .api import SettingsViewSet


router = routers.DefaultRouter()
router.register('api/settings', SettingsViewSet, 'settings')

urlpatterns = router.urls
