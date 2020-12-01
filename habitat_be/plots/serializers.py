from rest_framework import serializers
from .models import Plot
from authentication.serializers import UserSerializer
from area import area
import datetime, time

class PlotSearchSerializer(serializers.ModelSerializer):
    size_ha = serializers.SerializerMethodField(method_name='get_size_ha')
    class Meta:
            model = Plot
            fields = (
                'id',
                'title',
                'lat',
                'lng',
                'size_ha',
                'habitat_type',
            )
    def get_size_ha(self, instance):
        hectares = round(instance.size / 10000, 1)
        return hectares

class PlotViewSerializer(serializers.ModelSerializer):
    size_ha = serializers.SerializerMethodField(method_name='get_size_ha')
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    class Meta:
        model = Plot
        fields = ('title', 'size_ha', 'region', 'habitat_type', 'description', 'createdAt', 'imageURL')

    def get_size_ha(self, instance):
        hectares = round(instance.size / 10000, 1)
        return hectares

    def get_created_at(self, instance):
        for_js = int(time.mktime(instance.created_at.timetuple())) * 1000
        return for_js

class PlotSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    createdAt = serializers.SerializerMethodField(method_name='get_created_at')
    description = serializers.CharField(required=False)
    class Meta:
        model = Plot
        fields = (
            'author',
            'title',
            'info',
            'lat',
            'lng',
            'size',
            'region',
            'habitat_type',
            'description',
            'createdAt',
            'imageURL'
        )
    
    def create(self, validated_data):
        author = self.context.get('author', None)
        # print("CREATE 2----------------------------------")
        # size = self.context.get('size', None)
        # size = self.context['size']
        # region = self.context['region']
        # region = self.context.get('region', None)
        # print("CREATE 3----------------------------------")
        # print("CREATE 4----------------------------------")
        plot = Plot.objects.create(author=author, **validated_data)
        return plot

    def get_created_at(self, instance):
        return instance.created_at.isoformat()