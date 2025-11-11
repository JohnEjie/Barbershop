from django.db import models
from django.utils import timezone
from users.models import CustomUser
from barbers.models import Barber

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    customer = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='appointments',
        null=True,
        blank=True
    )
    barber = models.ForeignKey(
        Barber,
        on_delete=models.CASCADE,
        related_name='appointments',
        null=True,
        blank=True
    )
    appointment_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        """String representation of an appointment."""
        return f"{self.customer.username} with {self.barber.user.username} on {self.appointment_date.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ['-appointment_date']
