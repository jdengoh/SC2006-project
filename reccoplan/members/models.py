from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
	
	#updated = models.DateTimeField(auto_now=True)
	#timestamp = models.DateTimeField(auto_now_add=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	first_name = models.CharField(verbose_name="First Name",max_length=50, null=True, blank=True)
	last_name = models.CharField(verbose_name="Last Name",max_length=50, null=True, blank=True)
	telephone = models.IntegerField(verbose_name="Telephone", null=True, blank=True)
	address = models.CharField(verbose_name="Address",max_length=100, null=True, blank=True)
	postal_code = models.IntegerField(verbose_name="Postal Code", null=True, blank=True)
	email = models.EmailField(verbose_name="Email",max_length=200, null=True, blank=True)
	
	#is_active = models.BooleanField(default = True)
	#email_verified = models.BooleanField(default = False)
	#has_profile = models.BooleanField(default=False)

	def __str__(self):
		return f'{self.user}'

from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserProfile(models.Model):
	
	#updated = models.DateTimeField(auto_now=True)
	#timestamp = models.DateTimeField(auto_now_add=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	first_name = models.CharField(verbose_name="First Name",max_length=50, null=True, blank=True)
	last_name = models.CharField(verbose_name="Last Name",max_length=50, null=True, blank=True)
	telephone = models.IntegerField(verbose_name="Telephone", null=True, blank=True)
	address = models.CharField(verbose_name="Address",max_length=100, null=True, blank=True)
	postal_code = models.IntegerField(verbose_name="Postal Code", null=True, blank=True)
	email = models.EmailField(verbose_name="Email",max_length=200, null=True, blank=True)
	
	#is_active = models.BooleanField(default = True)
	#email_verified = models.BooleanField(default = False)
	#has_profile = models.BooleanField(default=False)

	def __str__(self):
		return f'{self.user}'




'''
Our UserToken model is used to store verification tokens generated by users.
'''
class UserToken(models.Model):
	
	updated = models.DateTimeField(auto_now=True)
	timestamp = models.DateTimeField(auto_now_add=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	token = models.CharField(max_length=100, null=True, blank=True)
	
	#used to change the object type
	is_email = models.BooleanField(default= False)
	is_password = models.BooleanField(default = False)

	is_active = models.BooleanField(default = True)

	def __str__(self):
		return f'{self.user}'