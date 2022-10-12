from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, TemplateView

from ..decorators import administrator_required, seeker_required
from ..forms import AdministratorSignUpForm
from ..models import User

class AdministratorSignUpView(CreateView):
    model = User
    form_class = AdministratorSignUpForm
    template_name = 'registration/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'administrator'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('home')

@method_decorator([login_required, administrator_required], name='dispatch')
class AdministratorProfileView(TemplateView):
    template_name = 'accounts/administrators/administrator_profile.html'