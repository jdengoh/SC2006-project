from rest_framework import serializers
from .models import UserItinerary
from maps.serializers import LocationSerializer

class ItinerarySerializer(serializers.ModelSerializer):
    
    activities = LocationSerializer(many=True, read_only=True)
    

    class Meta:
        model = UserItinerary
        fields = ['id', 'name', 'user', 'activities'] #protected fields?
