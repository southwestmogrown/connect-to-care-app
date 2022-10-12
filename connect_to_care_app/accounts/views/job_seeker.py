from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, TemplateView

from ..decorators import seeker_required
from ..forms import JobSeekerSignUpForm
from ..models import User

class SeekerSignUpView(CreateView):
    model = User
    form_class = JobSeekerSignUpForm
    template_name = 'registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'seeker'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('seekers:jobs_listings')

@method_decorator([login_required, seeker_required], name='dispatch')
class SeekerProfileView(TemplateView):
    template_name = 'accounts/seekers/seeker_profile.html'
