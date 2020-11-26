from django.contrib import admin
from .models import Plot

class PlotAdmin(admin.ModelAdmin):
    model = Plot

admin.site.register(Plot, PlotAdmin)
