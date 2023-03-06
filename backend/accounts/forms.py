from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.db import transaction

from djmoney.models.fields import MoneyField
from django.db import models

from .models import Administrator, Facility, Seeker, SeekerEmploymentVerifications, User, ShiftPost

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

class XYZ_DateInput(forms.DateInput):
    input_type = "date"
    def __init__(self, **kwargs):
        kwargs["format"] = "%Y-%m-%d"
        # kwargs["format"] = "%d-%m-%Y"
        super().__init__(**kwargs)

class XYZ_DateTimeInput(forms.TimeInput):
    input_type = "time"
    #input_type = "datetime"
    def __init__(self, **kwargs):
        kwargs["format"] = "T%H:%M"
        super().__init__(**kwargs)


class ShiftPostForm(forms.ModelForm):
    class Meta:
        model = ShiftPost
        fields = ['posted_by', 'facility', 'department', 'position', 'special_qualifications', 'start_date', 'end_date', 'shift_start', 'shift_end', 'rate_of_pay']
        widgets = {
            'start_date': XYZ_DateInput(format=["%y-%m-%d"]),
            'end_date': XYZ_DateInput(format=["%y-%m-%d"]),
            'shift_start': XYZ_DateTimeInput(format=["T%H:%M"]),
            'shift_end': XYZ_DateTimeInput(format=["T%H:%M"]),
            
        }
    