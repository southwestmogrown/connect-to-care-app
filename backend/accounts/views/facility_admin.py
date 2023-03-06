from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, get_object_or_404
from django.utils.decorators import method_decorator
from django.contrib import messages

from django.views.generic import CreateView, TemplateView


from ..decorators import administrator_required, seeker_required
from ..forms import AdministratorSignUpForm, AdministratorCredentialsForm, FacilityForm
from ..models import Administrator, User, Facility, ShiftPost

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

    def get_context_data(self,*args, **kwargs):
        context = super().get_context_data(**kwargs)
        context['shift_posts'] = ShiftPost.objects.filter(posted_by=context['pk'])
        return context

@method_decorator([login_required, administrator_required], name='dispatch')
class AdministratorCredentialsView(CreateView):
    model: Administrator
    form_class = AdministratorCredentialsForm
    template_name = 'accounts/administrators/administrator_credentials.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'administrator'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        return redirect('home')

@method_decorator([login_required, administrator_required], name='dispatch')
class AdministratorFacilityFormView(CreateView):
    model: Facility
    form_class = FacilityForm
    template_name = 'accounts/administrators/facility.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'administrator'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        return redirect('home')

@administrator_required
def admin_credentials(request):
    if request.method == 'POST':
        full_name = request.POST['full_name']
        title = request.POST['title']
        position = request.POST['position']
        address = request.POST['address']
        phone_number = request.POST['phone_number']
        uid = request.user.get_id()
        new_admin = Administrator.objects.create(user_id=uid, full_name=full_name, title=title, position=position, address=address, phone_number=phone_number)
        user = get_object_or_404(User, pk=uid)
        user.has_credentials = True
        user.save()
        return redirect('home')

@administrator_required
def facility_create(request):
    if request.method == 'POST':
        name = request.POST['name']
        website_url = request.POST['website_url']
        taxID = request.POST['taxID']

        uid = request.user.get_id()
        user = get_object_or_404(Administrator, user_id=uid)
        print(user)
        new_facility = Facility.objects.create(admin_id=uid, name=name, website_url=website_url, taxID=taxID)
        user.facility_enrolled = True
        user.save()
        return redirect('home')
