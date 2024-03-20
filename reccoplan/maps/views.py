from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView
from django.conf import settings
from .models import *

# -- test function --


class LocationView(View):
    template_name = "maps/templates/maps/location.html"
    
    def get(self,request,pri_key):
        location = Location.objects.get(pk = pri_key)

        context = {
            "location":location
        }

        return render(request, self.template_name, context)
    

class HomeView(ListView):
    template_name = "maps/home.html"
    context_object_name = "location"
    model = Location
    # success_url = "/"
    
    # def get_data(request, pri_key):
    #     location = Location.objects.get(pk = pri_key)

    #     if location.address and location.postal_code != None:
    #         address_string = str(location.address) + str(location.postal_code)

    #         gmaps = googlemaps.Client(key = settings.GOOGLE_API_KEY)
    #         result = gmaps.geocode(address_string)[0]
    #         return result

    
    # ths doesnt work need to create seperate view to test the google api first


