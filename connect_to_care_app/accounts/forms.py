from django.contrib.auth.forms import UserCreationForm

from .models import User

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
