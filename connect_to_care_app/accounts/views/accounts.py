from django.shortcuts import render, redirect
from django.views.generic import TemplateView

class SignUpView(TemplateView):
    template_name = 'registration/signup.html'

def home(request):
    if request.user.is_authenticated:
        if request.user.is_administrator:
            return redirect('administrators:administrator_profile', pk=request.user.pk)
        else:
            return redirect('seekers:seeker_profile', pk=request.user.pk)
    return render(request, 'accounts/home.html')