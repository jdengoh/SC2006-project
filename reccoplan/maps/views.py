from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView
from django.conf import settings
from .models import *
from members.views import *
from itinerary.views import *

# -- test function --


class LocationView(View):
    template_name = "maps/templates/maps/location.html"
    
    def get(self,request,pri_key):
        location = Location.objects.get(pk = pri_key)

        context = {
            "location":location
        }

        return render(request, self.template_name, context)
    

def home(Request):
    return HttpResponse('<h1>Maps Home</h1>')


class Homehtml(View):
    template_name = "maps/home.html" #homeview is mapview for our project
    #context_object_name = "location"
    #model = Location
    ## success_url = "/"
    def get(self, request):
        key=settings.GOOGLE_API_KEY
        context={
            "key": "AIzaSyBk5ooSVUwus0brlxpsPK0xC00ncs4cMI4"
        }
        
        return render(request, self.template_name, context)


def get_data(request, pri_key):
    location = Location.objects.get(pk = pri_key)

    #     if location.address and location.postal_code != None:
    #         address_string = str(location.address) + str(location.postal_code)

    #         gmaps = googlemaps.Client(key = settings.GOOGLE_API_KEY)
    #         result = gmaps.geocode(address_string)[0]
    #         return result

    
    # ths doesnt work need to create seperate view to test the google api first


