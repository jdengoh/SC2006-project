from django.db import models
from itinerary.models import *

# -- Location Data --

class Location(models.Model):
    name = models.CharField(max_length = 100)
    postal_code = models.CharField(max_length = 10, blank=True, null=True)
    address = models.CharField(max_length = 200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    edited_at = models.DateTimeField(auto_now=True)
    itineraryID = models.ForeignKey(UserItinerary, on_delete=models.CASCADE, null=True) # to change since location added to itinerary?

    def __str__(self):
        return self.name
    

# class Meta:
#     managed = True
#     db_table = 'Location'