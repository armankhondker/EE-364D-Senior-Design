from django.db import models


class Matching(models.Model):
    project_org = models.CharField(max_length=100)
    student = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
