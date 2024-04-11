from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserItinerary(models.Model):

    name = models.CharField(max_length = 100)
    created_at = models.DateField(auto_now_add=True, null=True)
    updated_at = models.DateField(auto_now=True, null=True)
    
    # foreign key
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)