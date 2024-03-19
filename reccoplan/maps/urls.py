from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'maps-home'),
    path('location/', views.Location, name = 'maps-locations')
]