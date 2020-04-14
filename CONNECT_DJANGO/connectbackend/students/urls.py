from rest_framework import routers
from .api import StudentViewSet, ResumeViewSet


router = routers.DefaultRouter()
router.register('api/students', StudentViewSet, 'students')
router.register('api/resumes', ResumeViewSet, 'resumes')

urlpatterns = router.urls
