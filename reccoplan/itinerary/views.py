from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from .models import *
from maps.views import *

# from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ItinerarySerializer

# Create your views here.

class ItineraryPage(View):
    template_name = "itinerary/itineraryPage.html"
    def get(self, request):
        key=settings.GOOGLE_API_KEY
        context={
            "key": "AIzaSyBk5ooSVUwus0brlxpsPK0xC00ncs4cMI4"
        }
        return render(request, self.template_name, context)


# -- API VIEWS --

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/itinerary-list/',
        'Detailed View':'/itinerary-detail/<str:pk>/',
        'Create':'/itinerary-create/',
        'Update':'/itinerary-update/<str:pk>',
        'Delete':'/itinerary-delete/<str:pk>',
    }
    return Response(api_urls)

# class YourItineraryList(generics.ListAPIView):
#     serializer_class = ItinerarySerializer
#     def get_queryset(self):
#         # Get the currently authenticated user
#         user = self.request.user

#         # Filter data based on user
#         queryset = UserItinerary.objects.filter(user=user)
#         return queryset


@api_view(['GET'])
def ItineraryList(request):

    user = request.user

    itineraryList = UserItinerary.objects.filter(user=user)
    if itineraryList:
        serializer = ItinerarySerializer(itineraryList, many=True)
        return Response(serializer.data)
    else:
        return Response({})
    
@api_view(['GET'])
def ItineraryDetail(request, pk):
    
    itinerary = UserItinerary.objects.get(id=pk)
    if itinerary:
        itineraryDetail = UserItinerary.objects.filter(id=pk)
        serializer = ItinerarySerializer(itineraryDetail, many=True)
        return Response(serializer.data)
    else:
        return Response({})
    
@api_view(['POST'])
def ItineraryCreate(request):
    serializer = ItinerarySerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def ItineraryUpdate(request, pk):
    itinerary = UserItinerary.objects.get(id=pk)
    serializer = ItinerarySerializer(instance=itinerary, data=request.data)
    
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def ItineraryDelete(request, pk):
    itinerary = UserItinerary.objects.get(id=pk)
    itinerary.delete()
    # return Response(serializer.data) 