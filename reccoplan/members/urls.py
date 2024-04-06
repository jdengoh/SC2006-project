from django.urls import path
from . import views
from .views import *

app_name = 'members'

urlpatterns = [
    # path('', HomeView.as_view(), name = 'maps-home'),
    path('login', views.loginpage, name ='login'),
    path('logout', views.logout_user, name ='logout'),
    path('register', views.registerpage, name = 'register'),
]