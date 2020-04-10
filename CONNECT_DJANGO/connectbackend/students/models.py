# from django.db import models
from djongo import models
from django.contrib.postgres.fields import ArrayField


class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    eid = models.CharField(max_length=20)
    phone = models.CharField(max_length=12)
    email = models.EmailField(max_length=100)
    linkedIn = models.URLField(max_length=100, blank=True)
    resume_link = models.URLField(max_length=100, blank=True)
    intentions = ArrayField(models.CharField(max_length=100, blank=True), size=100)
    interests = ArrayField(models.CharField(max_length=100, blank=True), size=100)
    time_commitment = models.CharField(max_length=100)
    logistics = ArrayField(models.CharField(max_length=100), size=100)
    degree = models.CharField(max_length=100)
    tech_courses = ArrayField(models.CharField(max_length=100, blank=True), size=100)
    prof_courses = ArrayField(models.CharField(max_length=100, blank=True), size=100)
    experience = ArrayField(models.CharField(max_length=100, blank=True), size=100)
    tech_skills = ArrayField(models.CharField(max_length=100), size=100)
    prof_skills = ArrayField(models.CharField(max_length=100), size=100)
    other_skills = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


