from rest_framework import serializers
from .models import Location


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ['id', 'name', 'postal_code', 'address', 'itineraryID', 'is_Restaurant', 'lat', 'lon', 'position'] #protected fields?
        read_only_fields = ['created_at', 'edited_at']
