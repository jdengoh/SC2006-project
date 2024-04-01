from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import *
from maps.views import *

# Create your views here.

class ItineraryPage(View):
    template_name = "itinerary/itineraryPage.html"
    
