from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import *
from maps.views import *

# Create your views here.

class ItineraryPage(View):
    template_name = "itinerary/itineraryPage.html"
    def get(self, request):
        key=settings.GOOGLE_API_KEY
        context={
            "key": "AIzaSyBk5ooSVUwus0brlxpsPK0xC00ncs4cMI4"
        }
        return render(request, self.template_name, context)

        
