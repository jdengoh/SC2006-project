from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class RegisterUserForm(UserCreationForm):
	email = forms.EmailField(widget=forms.EmailInput(attrs={'class':'form-control'}))
	first_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))
	last_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))
	telephone = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))
	address = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))
	postal_code = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))
	telephone = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))
	address = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))
	postal_code = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class':'form-control'}))


	def clean_email(self):
		email = self.cleaned_data.get('email')
		if email and User.objects.filter(email=email).exists():
			error_message = "The given email is already registered."
			self.add_error(None, error_message)  # Adding form-level error
		return email
	
	# def clean_telephone(self):
	# 	telephone = self.cleaned_data.get('telephone')
	# 	if telephone and User.objects.filter(telephone=telephone).exists():
	# 		error_message = "The given phone number is already registered."
	# 		self.add_error(None, error_message)  # Adding form-level error
	# 	return telephone

	class Meta:
		model = User
		fields = ('username', 'first_name', 'last_name', 'email', 'telephone', 'address', 'postal_code', 'telephone', 'address', 'postal_code', 'password1', 'password2')


	def __init__(self, *args, **kwargs):
		super(RegisterUserForm, self).__init__(*args, **kwargs)

		self.fields['username'].widget.attrs['class'] = 'form-control'
		self.fields['password1'].widget.attrs['class'] = 'form-control'
		self.fields['password2'].widget.attrs['class'] = 'form-control'