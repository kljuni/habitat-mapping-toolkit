from django.urls import path
from django.conf.urls import url
from . import views
from .views import ObtainTokenPairView, UserCreate, HelloWorldView
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('', views.index, name='index'),
    path('api/user/create/', UserCreate.as_view(), name="create_user"),
    path('api/token/obtain/', ObtainTokenPairView.as_view(), name='token_create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    url(r'^.*/$', views.index)  # for all other urls
]