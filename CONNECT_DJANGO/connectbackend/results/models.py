from djongo import models


class Matching(models.Model):
    project_org = models.CharField(max_length=100)
    student = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.attr_name


class Result(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    cohort = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    data = models.DictField(default={})
