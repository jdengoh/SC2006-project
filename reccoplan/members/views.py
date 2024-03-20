from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import HttpResponse

# Create your views here.
def loginpage(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user is not None:
                login(request, user)
                # Redirect to a success page.
                return redirect('maps-home')
        else:
                # Return an 'invalid login' error message.
                messages.success(request, ("There Was An Error Logging In, Please Try Again... "))
                return redirect('login')

    else:
        return render(request, 'login.html',{})
    