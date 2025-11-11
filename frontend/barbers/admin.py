from django.contrib import admin
from django.utils.html import format_html
from .models import Barber

@admin.register(Barber)
class BarberAdmin(admin.ModelAdmin):
    list_display = ('user', 'experience_years', 'specialization', 'pending_appointments')

    def pending_appointments(self, obj):
        """Display pending appointment details for each barber in the admin panel."""
        pending = (
            obj.appointments
            .filter(status__iexact='pending')
            .order_by('appointment_date')
        )
        if not pending.exists():
            return "No pending appointments"

        # Join multiple appointments with a line break
        return format_html(
            "<br>".join(
                [
                    f"{appointment.customer.username} - {appointment.appointment_date.strftime('%Y-%m-%d %H:%M')}"
                    for appointment in pending
                ]
            )
        )

    pending_appointments.short_description = "Pending Appointments"
