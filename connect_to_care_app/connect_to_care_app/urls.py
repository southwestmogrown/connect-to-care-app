"""connect_to_care_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from accounts.views import facility_admin, job_seeker, accounts


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/signup', accounts.SignUpView.as_view(), name='signup'),
    path('accounts/signup/seeker', job_seeker.SeekerSignUpView.as_view(), name='seeker_signup'),
    path('accounts/signup/administrator', facility_admin.AdministratorSignUpView.as_view(), name='administrator_signup')
]
