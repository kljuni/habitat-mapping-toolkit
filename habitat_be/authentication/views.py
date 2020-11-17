from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import MyTokenObtainPairSerializer, UserSerializer
from django.core.exceptions import ValidationError
from .models import User
import json

class Index(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request, format=None):
        return render(request, "authentication/index.html", context=None)

class GetUserInfo(APIView):
    def get(self, request, format=None):
        email = None
        print(request.user)
        if request.user.is_authenticated:
            email = request.user.email
            print(request.user)
        data={"email" : email}
        return Response(data=data, status=status.HTTP_200_OK)

class ObtainTokenPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class UserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        email = request.data['email']
        password = request.data['password']
        qs = User.objects.filter(email=email)
        # Check if email is already taken, if yes, return error
        if qs.exists():
            msg = {'email': 'Email taken'}
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)
        # Check if password is less than 8 chars long, if yes, return error
        if len(password) < 8:
            msg = {'password': 'Password too short. Must be at least 8 characters'}
            return Response(msg, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)