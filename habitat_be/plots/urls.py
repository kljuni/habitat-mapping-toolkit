from django.urls import path
from . import views
from .views import PlotCreate, PlotView, PlotSearchFilter, PlotDownload


urlpatterns = [
    # path('', Index.as_view(), name='index'),
    path('plots/', PlotCreate.as_view(), name="create_user"),
    path('search/filter/', PlotSearchFilter.as_view(), name="filter"),
    path('view/<int:id>/', PlotView.as_view(), name="view"),
    path('<int:id>/', PlotDownload.as_view(), name="download"),
]