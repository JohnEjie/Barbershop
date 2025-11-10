from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils import timezone

from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "email", "role", "is_staff", "is_active","appointment_dates")
    list_filter = ("is_staff", "is_active")  # removed role for now
    fieldsets = UserAdmin.fieldsets + (
        (None, {"fields": ("role",)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {"fields": ("role",)}),
    )

    def appointment_dates(self, obj):
        appointments = (
            obj.appointments
            .filter(status='pending')
            .order_by("appointment_date")
        )
        if not appointments.exists():
            return "No appointments"

        formatted_dates = [
            timezone.localtime(appt.appointment_date).strftime("%Y-%m-%d %H:%M")
            for appt in appointments
        ]
        return ", ".join(formatted_dates)

    appointment_dates.short_description = "Appointment Dates"
