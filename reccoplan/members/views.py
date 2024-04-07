from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import RegisterUserForm
from .models import UserProfilefrom 
django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib import messages
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse

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

def forgetpage(request):
    if request.method == "POST":
        email = request.POST.get('email')
        associated_users = User.objects.filter(email=email)
        if associated_users.exists():
            for user in associated_users:
                subject = "Password Reset Requested"
                email_template_name = "password_reset_email.txt"
                c = {
                "email":user.email,
                'domain':'EatLah.com',
                'site_name': 'EatLah',
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "user": user,
                'token': default_token_generator.make_token(user),
                'protocol': 'http',
                }
                email = render_to_string(email_template_name, c)
                try:
                    send_mail(subject, email, 'from@example.com' , [user.email], fail_silently=False)
                except:
                    return HttpResponse("Invalid header found.")
                return redirect("/login/")
        messages.error(request, "An error occurred, please try again.")
        return render(request, "forgetpass.html")
    else:
        return render(request, "forgetpass.html")