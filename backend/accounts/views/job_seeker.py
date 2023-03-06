from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, get_object_or_404, render
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, TemplateView

from ..decorators import seeker_required
from ..forms import EligibilityForm, JobSeekerSignUpForm, SeekersCredentialsForm
from ..models import Seeker, User, SeekerEmploymentVerifications, ShiftPost

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
        return redirect('home')

@method_decorator([login_required, seeker_required], name='dispatch')
class SeekerProfileView(TemplateView):
    template_name = 'accounts/seekers/seeker_profile.html'

    def get_context_data(self,*args, **kwargs):
        context = super().get_context_data(**kwargs)
        context['shift_posts'] = ShiftPost.objects.all()
        return context

@method_decorator([login_required, seeker_required], name='dispatch')
class SeekerCredentialsView(CreateView):
    model: Seeker
    form_class = SeekersCredentialsForm
    template_name = 'accounts/seekers/seeker_credentials.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'seeker'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        return redirect('home')

@method_decorator([login_required, seeker_required], name='dispatch')
class EmploymentVerificationView(CreateView):
    model: SeekerEmploymentVerifications
    form_class = EligibilityForm
    template_name = 'accounts/seekers/seeker_verification.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'seeker'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        return redirect('home')

@seeker_required
def create_seeker(request):
    if request.method == 'POST':
        
        full_name = request.POST['full_name']
        birth_date = request.POST['birth_date']
        ssn = request.POST['ssn']
        title = request.POST['title']
        specialty = request.POST['specialty']
        phone_number = request.POST['phone_number']
        address = request.POST['address']
        has_been_disqualified = request.POST.get('has_been_disqualified', False)
        has_been_terminated = request.POST.get('has_been_terminated', False)
        
        if has_been_disqualified:
            has_been_disqualified = True

        if has_been_terminated:
            has_been_terminated = True
                
        uid = request.user.get_id()
        new_admin = Seeker.objects.create(
            user_id=uid, 
            full_name=full_name, 
            birth_date=birth_date, 
            ssn=ssn,
            title=title,
            specialty=specialty,
            address=address,
            phone_number=phone_number,
            has_been_disqualified=has_been_disqualified,
            has_been_terminated=has_been_terminated,
            )
        user = get_object_or_404(User, pk=uid)
        user.has_credentials = True
        user.save()
        return redirect('home')

@seeker_required
def verify_eligibility(request):
    if request.method == 'POST':
        photo_URL = request.POST['photo_URL']
        resume_URL = request.POST['resume_URL']
        tb_verification_URL = request.POST['tb_verification_URL']
        flu_verification_URL = request.POST['flu_verification_URL']
        covid_verification_URL = request.POST['covid_verification_URL']

        uid = request.user.get_id()
        verifications = SeekerEmploymentVerifications.objects.create(
            seeker_id = uid,
            photo_URL = photo_URL,
            resume_URL = resume_URL,
            tb_verification_URL = tb_verification_URL,
            flu_verification_URL = flu_verification_URL,
            covid_verification_URL = covid_verification_URL,
        )

        seeker = get_object_or_404(Seeker, pk=uid)
        seeker.verified = True
        seeker.save()

        return redirect('home')
