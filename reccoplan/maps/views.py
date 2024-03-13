from django.shortcuts import render
from django.http import HttpResponse

# -- test function --

def home(request):
    return HttpResponse("<h1> hello </h1>")