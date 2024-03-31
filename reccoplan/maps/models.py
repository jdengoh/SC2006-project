from django.db import models

# -- Location Data --

class Location(models.Model):
    name = models.CharField(max_length = 100)
    postal_code = models.CharField(max_length = 10, blank=True, null=True)
    address = models.CharField(max_length = 200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class Settings(models.Model):
    name = models.CharField(max_length = 100)

class UserProfile(models.Model):
	
	updated = models.DateTimeField(auto_now=True)
	timestamp = models.DateTimeField(auto_now_add=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	telephone = models.CharField(max_length=15, null=True, blank=True)
	address = models.CharField(verbose_name="Address",max_length=100, null=True, blank=True)
	town = models.CharField(verbose_name="Town/City",max_length=100, null=True, blank=True)
	county = models.CharField(verbose_name="County",max_length=100, null=True, blank=True)
	post_code = models.CharField(verbose_name="Post Code",max_length=8, null=True, blank=True)
	country = models.CharField(verbose_name="Country",max_length=100, null=True, blank=True)

	longitude = models.CharField(verbose_name="Longitude",max_length=50, null=True, blank=True)
	latitude = models.CharField(verbose_name="Latitude",max_length=50, null=True, blank=True)
	

	def __str__(self):
		return f'{self.user}'