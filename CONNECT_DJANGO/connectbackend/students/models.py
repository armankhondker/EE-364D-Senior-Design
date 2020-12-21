# from django.db import models
from djongo import models
from django.db import models as models2


class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    eid = models.CharField(max_length=20)
    phone = models.CharField(max_length=12)
    email = models.EmailField(max_length=100)
    linkedIn = models.CharField(max_length=100, blank=True)
    resume_link = models.URLField(max_length=100, blank=True)
    intentions = models.DictField(default={})
    interests = models.DictField(default={})
    time_commitment = models.CharField(max_length=100)
    international = models.BooleanField(default=False)
    fin_aid = models.BooleanField(default=False)
    transportation = models2.BooleanField(default=False)
    flexible_hours = models2.BooleanField(default=False)
    work_remotely = models2.BooleanField(default=False)
    degree = models.CharField(max_length=100)
    experience = models.DictField(default={})
    tech_skills = models.DictField(default={})
    prof_skills = models.DictField(default={})
    other_skills = models.TextField(max_length=500, blank=True)
    cohort = models.CharField(max_length=100)
    unique_id = models.CharField(max_length=100, unique=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Resume(models.Model):
    unique_id = models.CharField(max_length=100, unique=True, null=True)
    student_number = models.IntegerField(blank=True, null=True)
    data = models.TextField()

