from django.db import models

# Create your models here.

class UserItinerary(models.Model):

    name = models.CharField(max_length = 100)
    user = models.CharField(max_length = 20, null = True)    #TO-DO: change to foreign key when members model created