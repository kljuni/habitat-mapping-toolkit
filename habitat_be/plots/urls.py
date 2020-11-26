from django.urls import path
from . import views
from .views import PlotCreate, PlotSearch, PlotView


urlpatterns = [
    # path('', Index.as_view(), name='index'),
    path('create/', PlotCreate.as_view(), name="create_user"),
    path('search/', PlotSearch.as_view(), name="create_user"),
    path('view/<int:id>/', PlotView.as_view(), name="create_user"),
]