from rest_framework import routers
from .api import ProjectViewSet, SkillViewSet, TechSkillViewSet, ProfSkillViewSet, TechCourseViewSet, \
    ProfCourseViewSet, IntentionViewSet, DegreeViewSet, InterestViewSet, LogisticViewSet, ExperienceViewSet

router = routers.DefaultRouter()
router.register('api/projects', ProjectViewSet, 'projects')
router.register('api/skills', SkillViewSet, 'skills')
router.register('api/tech-skills', TechSkillViewSet, 'tech skills')
router.register('api/prof-skills', ProfSkillViewSet, 'prof skills')
router.register('api/tech-courses', TechCourseViewSet, 'tech courses')
router.register('api/prof-courses', ProfCourseViewSet, 'prof courses')
router.register('api/intentions', IntentionViewSet, 'intentions')
router.register('api/degrees', DegreeViewSet, 'degrees')
router.register('api/interests', InterestViewSet, 'interests')
router.register('api/logistics', LogisticViewSet, 'logistics')
router.register('api/experiences', ExperienceViewSet, 'experiences')
urlpatterns = router.urls
