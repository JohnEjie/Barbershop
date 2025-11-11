from django.contrib import admin

from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = (
        "customer",
        "barber",
        "appointment_date",
        "status_display",
        "notes_preview",
    )
    list_filter = ("status", "appointment_date", "barber")
    search_fields = ("customer__username", "barber__user__username", "notes")
    ordering = ("-appointment_date",)

    def status_display(self, obj):
        return obj.get_status_display()

    status_display.short_description = "Status"

    def notes_preview(self, obj):
        if not obj.notes:
            return ""
        return (obj.notes[:40] + "…") if len(obj.notes) > 40 else obj.notes

    notes_preview.short_description = "Notes"
