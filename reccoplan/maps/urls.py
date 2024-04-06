from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('', Homehtml.as_view(), name = 'maps-home'),
    path('location/', views.Location, name = 'maps-locations')
]