from django.urls import path
from . import views
from .views import *

app_name = 'maps'

urlpatterns = [
    path('', Homehtml.as_view(), name = 'maps-home'),
    path('location/', views.Location, name = 'maps-locations'),

    # API URLS
    path('api/', views.apiOverview, name="maps-api"),
    path('api/location-list/', views.LocationList),
    path('api/location-detail/<str:pk>/', views.LocationDetail),
    path('api/location-create/', views.LocationCreate),
    path('api/location-update/<str:pk>/', views.LocationUpdate),
    path('api/location-delete/<str:pk>/', views.LocationDelete),
]