from djongo import models


# Create your models here.
class Project(models.Model):
    contact_first_name = models.CharField(max_length=100)
    contact_last_name = models.CharField(max_length=100)
    contact_phone = models.CharField(max_length=12)
    contact_email = models.EmailField(max_length=100)
    organization_name = models.CharField(max_length=100)
    organization_address = models.CharField(max_length=200)
    organization_website = models.CharField(max_length=100)
    project_name = models.CharField(max_length=100)
    project_description = models.TextField(max_length=1000)
    project_categories = models.DictField(default={})
    time_commitment = models.CharField(max_length=100)
    logistics = models.DictField(default={})
    degree = models.DictField(default={})
    tech_courses = models.DictField(default={})
    prof_courses = models.DictField(default={})
    experience = models.DictField(default={})
    tech_skills = models.DictField(default={})
    prof_skills = models.DictField(default={})
    other_skills = models.TextField(max_length=500, blank=True)
    cohort = models.CharField(max_length=100)
    unique_id = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


class TechSkill(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


class ProfSkill(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


class TechCourse(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)
    courseId = models.CharField(max_length=100, unique=True, blank=False)


class ProfCourse(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)
    courseId = models.CharField(max_length=100, unique=True, blank=False)


class Intention(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


class Degree(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


class Interest(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


class Logistic(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


class Experience(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False)


