from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import RegisterUserForm
from .models import UserProfile



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
                return redirect('members:login')

    else:
        return render(request, 'login.html',{})

def logout_user(request):
      logout(request)
      messages.success(request, ("You Were Logged Out!"))
      return redirect('maps-home')        
    

def registerpage(request):
    if request.method == "POST":
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            user = form.save()

            UserProfile.objects.create(
                user=user,
                first_name=form.cleaned_data['first_name'],
                last_name=form.cleaned_data['last_name'],
                telephone = form.cleaned_data['telephone'],
                address=form.cleaned_data['address'],
                postal_code=form.cleaned_data['postal_code'],
                email=form.cleaned_data['email'],

            )

            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, ("Registration Successful!"))
            return redirect('maps-home')

    else:
        form = RegisterUserForm()

    return render(request, 'register.html', {'form':form,})

