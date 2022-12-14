from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.db import transaction

from .models import Administrator, Facility, Seeker, SeekerEmploymentVerifications, User

class AdministratorSignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "email")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_administrator = True
        if commit:
            user.save()
        return user

class JobSeekerSignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "email")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_seeker = True
        if commit:
            user.save()
        return user

class AdministratorCredentialsForm(forms.ModelForm):
    class Meta:
        model = Administrator
        fields = ['position', 'title', 'full_name', 'address', 'phone_number']

class SeekersCredentialsForm(forms.ModelForm):
    class Meta:
        model = Seeker
        fields = ['full_name', 'birth_date', 'ssn', 'title', 'specialty', 'phone_number', 'address', 'has_been_disqualified', 'has_been_terminated']

class FacilityForm(forms.ModelForm):
    class Meta:
        model = Facility
        fields = ['name', 'website_url', 'taxID']

class EligibilityForm(forms.ModelForm):
    class Meta:
        model = SeekerEmploymentVerifications
        fields = ['photo_URL', 'resume_URL', 'tb_verification_URL', 'flu_verification_URL', 'covid_verification_URL']

