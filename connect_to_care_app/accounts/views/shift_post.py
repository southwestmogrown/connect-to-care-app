from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, get_object_or_404
from django.utils.decorators import method_decorator
from django.contrib import messages

from django.views.generic import CreateView, TemplateView


from ..decorators import administrator_required, seeker_required
from ..forms import ShiftPostForm
from ..models import ShiftPost, Administrator, Facility

class ShiftPostFormView(CreateView):
    model: ShiftPost
    form_class = ShiftPostForm
    template_name = 'accounts/administrators/shift_post_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'administrator'
        return super().get_context_data(**kwargs)

    def form_valid(self, form):
        user = form.save()
        return redirect('home')

@administrator_required
def create_post(request):
    if request.method == 'POST':
        posted_by = request.POST['posted_by']
        user = Administrator.objects.get(pk=posted_by)
        facility = request.POST['facility']
        user_facility = Facility.objects.get(pk=facility)
        department = request.POST['department']
        position = request.POST['position']
        special_qualifications = request.POST['special_qualifications']
        start_date = request.POST['start_date']
        end_date = request.POST['end_date']
        shift_start = request.POST['shift_start']
        shift_end = request.POST['shift_end']
        rate_of_pay = request.POST['rate_of_pay']
        new_post = ShiftPost.objects.create(
            posted_by=user,
            facility=user_facility, 
            department=department, 
            position=position, 
            special_qualifications=special_qualifications, 
            start_date=start_date,
            end_date=end_date,
            shift_start=shift_start,
            shift_end=shift_end,
            rate_of_pay=rate_of_pay
            )
        
        return redirect('home')