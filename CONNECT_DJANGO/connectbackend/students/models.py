# from django.db import models
from djongo import models
from django.contrib.postgres.fields import JSONField


class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    eid = models.CharField(max_length=20)
    phone = models.CharField(max_length=12)
    email = models.EmailField(max_length=100)
    linkedIn = models.URLField(max_length=100, blank=True)
    resume_link = models.URLField(max_length=100, blank=True)
    intentions = JSONField()
    interests = JSONField()
    time_commitment = models.CharField(max_length=100)
    logistics = JSONField()
    degree = models.CharField(max_length=100)
    tech_courses = JSONField()
    prof_courses = JSONField()
    experience = JSONField()
    tech_skills = JSONField()
    prof_skills = JSONField()
    other_skills = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


