from django.urls import path
from . import views
from .views import *

app_name = 'members'

urlpatterns = [
    #path('', HomeView.as_view(), name = 'maps-home'),
    path('', views.loginpage, name ='login'),
]