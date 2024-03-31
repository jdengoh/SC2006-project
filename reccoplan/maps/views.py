from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.views.generic import ListView
from django.conf import settings
from .models import *
from members.views import *
import googlemaps

# -- test function --


class LocationView(View):
    template_name = "maps/templates/maps/location.html"
    
    def get(self,request,pri_key):
        location = Location.objects.get(pk = pri_key)

        context = {
            "location":location
        }

        return render(request, self.template_name, context)
    

class HomeView(ListView):
    template_name = "maps/home.html"
    context_object_name = "location"
    model = Location
    # success_url = "/"
    
    # def get_data(request, pri_key):
    #     location = Location.objects.get(pk = pri_key)

    #     if location.address and location.postal_code != None:
    #         address_string = str(location.address) + str(location.postal_code)

    #         gmaps = googlemaps.Client(key = settings.GOOGLE_API_KEY)
    #         result = gmaps.geocode(address_string)[0]
    #         return result

    
    # ths doesnt work need to create seperate view to test the google api first


class SettingView(ListView):
    template_name = "maps/settings.html"
    context_object_name = "settings"
    mocel = Settings

class GeocodingView(View):
    template_name = "maps/geocoding.html"

    def get(self,request,pk):
        location = Location.objects.get(pk=pk)

        context = {
            'location':location
        }
        return render(request, self.template_name, context)
    
def profile(request):
	
	up_form = UserProfileForm(instance=request.user.userprofile)
	result = "error"
	message = "Something went wrong. Please check and try again"

	if request.is_ajax() and request.method == "POST":
		up_form = UserProfileForm(data = request.POST, instance=request.user.userprofile)
		
		#if both forms are valid, do something
		if up_form.is_valid():
			user = up_form.save()

			up = request.user.userprofile
			up.has_profile = True
			up.save()

			result = "perfect"
			message = "Your profile has been updated"
			context = {"result": result, "message": message,}
		else:
			message = FormErrors(u_form, up_form)
			context = {"result": result, "message": message}

		return HttpResponse(
			json.dumps(context),
			content_type="application/json"
			)
		
	context = {
		'up_form':up_form,
		'google_api_key': settings.GOOGLE_API_KEY
		}
	return render(request, 'users/profile.html', context)
