from django.urls import path
from django.conf.urls import url
from . import views
from .views import Index, ObtainTokenPairView, UserCreate, HelloWorldView, LogoutAndBlacklistRefreshTokenForUserView, GetUserInfo
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('api/user/create/', UserCreate.as_view(), name="create_user"),
    path('api/token/obtain/', ObtainTokenPairView.as_view(), name='token_create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/getuser/', GetUserInfo.as_view(), name='user_info'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('api/blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    url(r'^.*/$', Index.as_view())  # for all other urls
]