from rest_framework import serializers
from .models import Location


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ['id', 'name', 'postal_code', 'address', 'itineraryID'] #protected fields?
        read_only_fields = ['created_at', 'edited_at']
