from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, blank=True)
    phone = models.CharField(max_length=12, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    resume_id = models.CharField(max_length=100)
    quadrant = models.CharField(max_length=100)
    technical = models.DecimalField(decimal_places=3, max_digits=5)
    professional = models.DecimalField(decimal_places=3, max_digits=5)
    availability_duration = models.CharField(max_length=100, blank=True)
    availability_time = models.CharField(max_length=100, blank=True)
    work_factors = models.CharField(max_length=100, blank=True)
    interest_buckets = models.CharField(max_length=100, blank=True)
    other = models.TextField(max_length=500, blank=True)


class Student2(models.Model):
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    eid = models.CharField(max_length=10, blank=False, unique=True)
    email = models.EmailField(max_length=100, blank=False, unique=True)
    phone = models.CharField(max_length=20, blank=True)
    linkedin = models.CharField(max_length=100, blank=True)
    # TBD
