from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import *

# -- test function --

def home(request):
    return render(request, 'maps/home.html')


class LocationView(View):
    template_name = "maps/templates/maps/list.html"
    
    def get(self.request,pri_key):
        location = Location.objects.get(pk = pri_key)

        context = {
            "location":location
        }

        return render(request, self.template_name, context)