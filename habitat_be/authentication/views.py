from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MyTokenObtainPairSerializer, UserSerializer


def index(request):
    return render(request, "authentication/index.html", context=None)

class ObtainTokenPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class UserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):
    
    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)