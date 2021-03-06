from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from .serializers import PlotSerializer, PlotSearchSerializer, PlotViewSerializer, PlotDownloadSerializer
from .models import Plot
from area import area
import json
from shapely.geometry import Point, Polygon
import geopandas as gpd
gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'
import shapely.speedups
import os
dirname = os.path.dirname(__file__)
# Define regije.kml path
filename = os.path.join(dirname, 'regije.kml')
shapely.speedups.enable()
import urllib.parse
from itertools import chain
from django.db.models import CharField, TextField
from django.db.models.functions import Lower
import json
import ast

CharField.register_lookup(Lower)
TextField.register_lookup(Lower)

def unique_chain(*iterables):
    known_ids = set()
    for it in iterables:
        for element in it:
            if element.id not in known_ids:
                known_ids.add(element.id)
                yield element

class PlotDownload(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id, format=None):
        try:
            data = Plot.objects.get(pk=id)
            serializer_data = PlotDownloadSerializer(data)
        except Exception as e:
            print(e)    
            return Response(serializer_data.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer_data.data, status=status.HTTP_201_CREATED) 


class PlotSearchFilter(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def get(self, request, format=None):
        hType = request.GET.get('hType')
        regija = request.GET.get('regija')
        searchString = request.GET.get('searchString')
        
        if hType == regija == searchString:
            try:
                data = Plot.objects.all()
                serializer = PlotSearchSerializer(data, many=True)
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            hType = urllib.parse.unquote(hType)
            regija = urllib.parse.unquote(regija)
            searchString = urllib.parse.unquote(searchString)

            data = Plot.objects.all().order_by('title')
            if regija != 'undefined':
                data = data.filter(region=regija)
            if hType != 'undefined':
                data = data.filter(habitat_type=hType)
            if searchString != 'undefined':
                region_r = data.filter(region__lower__icontains=searchString, )
            if searchString != 'undefined':
                description_r = data.filter(description__lower__icontains=searchString, )
            if searchString != 'undefined':
                habitat_r = data.filter(habitat_type__lower__icontains=searchString, )
            if searchString != 'undefined':
                title_r = data.filter(title__lower__icontains=searchString, )
                data = list(unique_chain(region_r, habitat_r, title_r, description_r))

            try:
                serializer = PlotSearchSerializer(data, many=True)
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_200_OK)


class PlotCreate(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        id = request.GET.get('id')
        try:
            data = Plot.objects.get(pk=id)
        except Exception as e:
            print(e)    
        serializer_data = PlotSerializer(data=data)
        if serializer_data.is_valid(): 
            json = serializer_data.data
            return Response(json, status=status.HTTP_201_CREATED) 
        return Response(serializer_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        global json
        
        try:
            geojson = ast.literal_eval(data.get('info'))
        except Exception as e:
            print(e)
            return Response({'error':'Please provide polygon data.'}, status=status.HTTP_400_BAD_REQUEST)

        geojson_extract = geojson['features'][0]['geometry']
        coord_data = geojson['features'][0]['geometry']['coordinates'][0]
        polygon_center = [sum(x)/len(x) for x in zip(*coord_data)]
        plot_area = area(geojson_extract)
        
        p1 = Point(polygon_center)
        polys = gpd.read_file(filename, driver='KML')    
        regije_list = ['Gorenjska', 'Goriška', 'Jugovzhodna Slovenija', 'Koroška', 'Notranjsko-kraška', 'Obalno-kraška', 'Osrednjeslovenska', 'Podravska', 'Pomurska', 'Savinjska', 'Spodnjeposavska', 'Zasavska']
        regija = 'Outside of Slovenia'

        for i in range(12):
            pip_mask = p1.within(polys.loc[i].loc['geometry'])
            if pip_mask: 
                regija = regije_list[i]  

        data['lat'] = round(polygon_center[1], 6)
        data['lng'] = round(polygon_center[0], 6)
        data['region'] = regija
        data['size'] = plot_area

        serializer_context = {
            'author': request.user,
        }

        serializer_data = PlotSerializer(data=data, context=serializer_context)
        if serializer_data.is_valid(): 
            serializer_data.save()
            json = serializer_data.data
            return Response(json, status=status.HTTP_201_CREATED) 
        return Response(serializer_data.errors, status=status.HTTP_400_BAD_REQUEST)

class PlotView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, id, format=None):
        try:
            data = Plot.objects.get(pk=int(id))
            serializer = PlotViewSerializer(data)
        except Exception as e:
            print(e)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)