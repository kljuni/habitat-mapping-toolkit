from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from .serializers import PlotSerializer, PlotSearchSerializer, PlotViewSerializer
from .models import Plot
from django.core.exceptions import ValidationError
from area import area
import json
import re
from shapely.geometry import Point, Polygon
import geopandas as gpd
import matplotlib.pyplot as plt
gpd.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'
import shapely.speedups
import os
dirname = os.path.dirname(__file__)
# Define regije.kml path
filename = os.path.join(dirname, 'regije.kml')
shapely.speedups.enable()
import urllib.parse
from itertools import chain
from django.db.models import CharField
from django.db.models.functions import Lower
import json
import ast
# Only for development purpose!
import time

CharField.register_lookup(Lower)

def unique_chain(*iterables):
    known_ids = set()
    for it in iterables:
        for element in it:
            if element.id not in known_ids:
                known_ids.add(element.id)
                yield element

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
                habitat_r = data.filter(habitat_type__lower__icontains=searchString, )
            if searchString != 'undefined':
                title_r = data.filter(title__lower__icontains=searchString, )
                data = list(unique_chain(region_r, habitat_r, title_r))

            try:
                serializer = PlotSearchSerializer(data, many=True)
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_200_OK)


class PlotCreate(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        global json
        # try:
        #     geojson_extract = re.search(r'\{"type":"Polygon","coordinates":\[\[\[\d\d.+?\]\]\]\}', str(geojson)).group()
        # except: 
        #     # TODO
        #     # Report error in geojson to user
        #     print("error happening geojson_extract ------------------------------")
        #     pass
        try:
            print(type(data))
            print(type(data.get('info')))
            print("data.get('info')) ---------------")
            geojson = ast.literal_eval(data.get('info'))
            
        except Exception as e:
            print(e)
            return Response({'error':'Please provide polygon data.'}, status=status.HTTP_400_BAD_REQUEST)
        geojson_extract = geojson['features'][0]['geometry']
        coord_data = geojson['features'][0]['geometry']['coordinates'][0]
        polygon_center = [sum(x)/len(x) for x in zip(*coord_data)]
        # except:
        #     pass
        plot_area = area(geojson_extract)
        serializer_context = {
            'author': request.user,
        }
        # try:
        #     p1 = re.search(r'\[\d\d.+?\]', str(geojson_extract)).group()[1:-1]
        # except:
        #     # TODO
        #     # report error
        #     pass
        p1 = tuple(polygon_center) 
        p1 = Point(polygon_center)
        polys = gpd.read_file(filename, driver='KML')    
        regije_list = ['Gorenjska', 'Goriška', 'Jugovzhodna Slovenija', 'Koroška', 'Notranjsko-kraška', 'Obalno-kraška', 'Osrednjeslovenska', 'Podravska', 'Pomurska', 'Savinjska', 'Spodnjeposavska', 'Zasavska']
        regija = 'Outside of Slovenia'
        for i in range(12):
            pip_mask = p1.within(polys.loc[i].loc['geometry'])
            if pip_mask: 
                regija = regije_list[i]     
        print('works 2 --------------------------------------------')
        
        data['lat'] = round(polygon_center[1], 6)
        data['lng'] = round(polygon_center[0], 6)
        print(data['lat'])
        print('works 3 --------------------------------------------')
        data['region'] = regija
        data['size'] = plot_area
        serializer_data = PlotSerializer(data=data, context=serializer_context)
        print('works 4 --------------------------------------------')
        if serializer_data.is_valid(): 
            serializer_data.save()
            print('works 5 --------------------------------------------')
            json = serializer_data.data
            print('works 7 --------------------------------------------')
            return Response(json, status=status.HTTP_201_CREATED) 
        print('works 6 --------------------------------------------')
        return Response(serializer_data.errors, status=status.HTTP_400_BAD_REQUEST)

class PlotView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, id, format=None):
        try:
            data = Plot.objects.get(pk=int(id))
            serializer = PlotViewSerializer(data)
        except Exception as e:
            print(e)
            print('e -----------------------------------------------------------')
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data=data, status=status.HTTP_200_OK)