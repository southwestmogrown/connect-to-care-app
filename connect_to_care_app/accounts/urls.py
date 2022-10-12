from django.urls import include, path


from .views import accounts, job_seeker, facility_admin


urlpatterns = [
    path('', accounts.home, name='home'),
    path('seekers/', include(([
        path('<int:pk>/', job_seeker.SeekerProfileView.as_view(), name='seeker_profile')
    ], 'accounts'), namespace='seekers')),
    path('administrators/', include(([
        path('<int:pk>/', facility_admin.AdministratorProfileView.as_view(), name='administrator_profile')
    ], 'accounts'), namespace='administrators'))
]