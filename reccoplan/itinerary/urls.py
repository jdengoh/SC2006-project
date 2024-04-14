from django.urls import path
from . import views
from .views import *

# from .models import UserItinerary
app_name = 'itinerary'

urlpatterns = [
    path('', ItineraryPage.as_view(), name="itinerary-home"),

    # API URLS
    path('api/', views.apiOverview, name="itinerary-api"),
    path('api/itinerary-list/', views.ItineraryList),
    path('api/itinerary-detail/<str:pk>/', views.ItineraryDetail),
    path('api/itinerary-create/', views.ItineraryCreate),
    path('api/itinerary-update/<str:pk>/', views.ItineraryUpdate),
    path('api/itinerary-delete/<str:pk>/', views.ItineraryDelete),

    path('api/restaurants-list/', views.RestaurantList),


]