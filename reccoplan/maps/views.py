from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView
from django.conf import settings
from .models import *
from members.views import *

from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import LocationSerializer

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


# -- API VIEWS --

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/location-list/',
        'Detailed View':'/location-detail/<str:pk>/',
        'Create':'/location-create/',
        'Update':'/location-update/<str:pk>',
        'Delete':'/location-delete/<str:pk>',
    }
    return Response(api_urls)

@api_view(['GET'])
def LocationList(request):
    locationList = Location.objects.all()
    if locationList:
        serializer = LocationSerializer(locationList, many=True)
        return Response(serializer.data)
    else:
        return Response({})
    
@api_view(['GET'])
def LocationDetail(request, pk):
    location = Location.objects.get(id=pk)
    if location:
        locationDetail = Location.objects.filter(id=pk)
        serializer = LocationSerializer(locationDetail, many=True)
        return Response(serializer.data)
    else:
        return Response({})
    
@api_view(['POST'])
def LocationCreate(request):
    serializer = LocationSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def LocationUpdate(request, pk):
    location = Location.objects.get(id=pk)
    serializer = LocationSerializer(instance=location, data=request.data)
    
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def LocationDelete(request, pk):
    location = Location.objects.get(id=pk)
    location.delete()
    # return Response(serializer.data) 


def get_current_user_id(request):
    if request.user:
        return JsonResponse({'user_id': request.user.id})
    else:
        return JsonResponse({'error': 'User not authenticated'}, status=401)