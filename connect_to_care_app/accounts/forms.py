from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.db import transaction

from .models import Administrator, Facility, User

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

    @transaction.atomic
    def save(self, commit=True):
        user = super().save(commit=False)
        user.has_credentials = True
        user.save()
        administrator = Administrator.objects.create(user=user)
        return user


class FacilityForm(forms.ModelForm):
    class Meta:
        model = Facility
        fields = ['name', 'website_url', 'taxID']

    @transaction.atomic
    def save(self, commit=True):
        user = super().save(commit=False)
        user.has_credentials = True
        user.save()
        administrator = Administrator.objects.create(user=user)
        return user