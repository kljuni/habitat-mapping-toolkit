from django.urls import path
from . import views
from .views import PlotCreate, PlotView, PlotSearchFilter


urlpatterns = [
    # path('', Index.as_view(), name='index'),
    path('create/', PlotCreate.as_view(), name="create_user"),
    path('search/filter/<str:hType>/<str:regija>/<str:searchString>/', PlotSearchFilter.as_view(), name="create_user"),
    path('view/<int:id>/', PlotView.as_view(), name="create_user"),
]