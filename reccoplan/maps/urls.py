from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'maps-home'),
    path('locations/', views.locations, name = 'maps-locations')
]