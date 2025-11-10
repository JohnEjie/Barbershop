from django.db import models
from users.models import CustomUser


class Barber(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    experience_years = models.PositiveIntegerField(default=0)
    specialization = models.CharField(max_length=100, blank=True)

    def __str__(self) -> str:
        return self.user.username

    @property
    def pending_appointments_details(self):
        """Return pending appointments for this barber in a human-readable format."""
        pending = (
            self.appointments
            .filter(status__iexact='pending')
            .order_by('appointment_date')
        )
        if not pending.exists():
            return "No pending appointments"
        return [
            f"{appointment.customer.username} on {appointment.appointment_date.strftime('%Y-%m-%d %H:%M')}"
            for appointment in pending
        ]
