from django.db import models


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100, unique=True)
    primary = models.CharField(max_length=100)
    secondary = models.CharField(max_length=100, blank=True)
    technical = models.DecimalField(decimal_places=3, max_digits=5)
    professional = models.DecimalField(decimal_places=3, max_digits=5)
    quadrant = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)
