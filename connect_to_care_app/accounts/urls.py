from django.urls import include, path


from .views import accounts, job_seeker, facility_admin


urlpatterns = [
    path('', accounts.home, name='home'),
    path('seekers/', include(([
        path('', job_seeker.create_seeker, name='create_seeker'),
        path('<int:pk>/', job_seeker.SeekerProfileView.as_view(), name='seeker_profile'),
        path('seeker_credentials/', job_seeker.SeekerCredentialsView.as_view(), name='seeker_credentials'),
        path('employment_eligibility/', job_seeker.EmploymentVerificationView.as_view(), name='employment_eligibility'),
        path('verification/', job_seeker.verify_eligibility, name='verification')
    ], 'accounts'), namespace='seekers')),
    path('administrators/', include(([
        path('', facility_admin.admin_credentials, name='admin_credential_post'),
        path('<int:pk>/', facility_admin.AdministratorProfileView.as_view(), name='administrator_profile'),
        path('admin_credentials/', facility_admin.AdministratorCredentialsView.as_view(), name='admin_credentials' ),
        path('facility/', facility_admin.AdministratorFacilityFormView.as_view(), name='facility' ),
        path('facilities/', facility_admin.facility_create, name='facility_create'),
    ], 'accounts'), namespace='administrators'))
]