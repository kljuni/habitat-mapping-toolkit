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

class PlotSearch(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    def get(self, request, format=None):
        try:
            data = Plot.objects.all()
            serializer = PlotSearchSerializer(data, many=True)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PlotCreate(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        geojson = data.get('info')
        try:
            geojson_extract = re.search(r'\{"type":"Polygon","coordinates":\[\[\[\d\d.+\]\]\]\}', str(geojson)).group()
        except: 
            # TODO
            # Report error in geojson to user
            print("error happening geojson_extract ------------------------------")
            pass
        plot_area = area(geojson_extract)
        serializer_context = {
            'author': request.user,
        }
        try:
            p1 = re.search(r'\[\d\d.+?\]', str(geojson_extract)).group()[1:-1]
        except:
            # TODO
            # report error
            pass
        res = tuple(map(float, p1.split(','))) 
        p1 = Point(res)
        polys = gpd.read_file(filename, driver='KML')    
        regije_list = ['Gorenjska', 'Goriška', 'Jugovzhodna Slovenija', 'Koroška', 'Notranjsko-kraška', 'Obalno-kraška', 'Osrednjeslovenska', 'Podravska', 'Pomurska', 'Savinjska', 'Spodnjeposavska', 'Zasavska']
        regija = 'Outside of Slovenia'
        for i in range(12):
            pip_mask = p1.within(polys.loc[i].loc['geometry'])
            if pip_mask: 
                regija = regije_list[i]     
        print('works 2 --------------------------------------------')
        print(res[1])
        print(type(res[1]))
        
        data['lat'] = round(res[1], 6)
        data['lng'] = round(res[0], 6)
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