from rest_framework import serializers
from .models import UserItinerary


class ItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = UserItinerary
        fields = ['id', 'name', 'user'] #protected fields?
