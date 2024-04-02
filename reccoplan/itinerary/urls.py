from django.urls import path
from . import views
from .views import *

app_name = 'itinerary'

urlpatterns = [
    path('', ItineraryPage.as_view(), name="itinerary-home")
]