from django.db import models
from .utils import JSONField

class Plot(models.Model):
    author = models.ForeignKey('authentication.User', on_delete=models.PROTECT, related_name='plots')
    title = models.CharField(max_length=255)

    info = JSONField()
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)

    size = models.FloatField()
    region = models.CharField(max_length=50)
    habitat_type = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    imageURL = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title