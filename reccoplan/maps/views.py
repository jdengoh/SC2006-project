from django.shortcuts import render
from django.http import HttpResponse

# -- test function --

def home(request):
    return render(request, 'maps/home.html')