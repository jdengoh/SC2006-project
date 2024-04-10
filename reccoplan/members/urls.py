from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from .views import *

app_name = 'members'

urlpatterns = [
    # path('', HomeView.as_view(), name = 'maps-home'),
    path('login', views.loginpage, name ='login'),
    path('logout', views.logout_user, name ='logout'),
    path('register', views.registerpage, name = 'register'),
    path('reset_password/', auth_views.PasswordResetView.as_view(template_name = "registration/password_reset.html" ), name="reset_password"),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name = "registration/password_reset_sent.html"), name="password_reset_done"),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name = "registration/password_reset_confirm.html"), name="password_reset_confirm"),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(template_name = "registration/password_reset_done.html"), name="password_reset_complete"),
]