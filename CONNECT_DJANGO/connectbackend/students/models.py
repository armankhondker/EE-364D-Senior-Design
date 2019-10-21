from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=12)
    created_at = models.DateTimeField(auto_now_add=True)
