from rest_framework import routers
from .api import ProjectViewSet, SkillViewSet

router = routers.DefaultRouter()
router.register('api/projects', ProjectViewSet, 'projects')
router.register('api/skills', SkillViewSet, 'skills')

urlpatterns = router.urls
