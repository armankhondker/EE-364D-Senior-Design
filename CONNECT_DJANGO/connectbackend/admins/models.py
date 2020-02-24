from django.db import models


# Create your models here.
class Admin(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, blank=True)
    phone = models.CharField(max_length=12, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=100)
    salt = models.CharField(max_length=100)
