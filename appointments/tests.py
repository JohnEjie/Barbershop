import pytest
from datetime import datetime

from django.contrib.admin.sites import AdminSite
from django.utils import timezone

from users.models import CustomUser
from barbers.models import Barber
from appointments.models import Appointment
from appointments.admin import AppointmentAdmin


@pytest.mark.django_db
class TestAppointmentModel:
    """Test cases for the Appointment model."""

    def setup_method(self):
        """Set up sample users and barber before each test."""
        # Create a customer user
        self.customer = CustomUser.objects.create_user(
            username="customer1",
            password="testpass123",
            role="customer"
        )

        # Create a barber user
        self.barber_user = CustomUser.objects.create_user(
            username="barber1",
            password="testpass123",
            role="barber"
        )

        # Create the barber profile linked to the barber user
        self.barber = Barber.objects.create(
            user=self.barber_user,
            bio="Professional barber",
            experience_years=5,
            specialization="Fade cuts"
        )

        # Create an appointment
        self.appointment = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=timezone.now(),
            status="pending",
            notes="First appointment"
        )

    def test_appointment_creation(self):
        """Test that the appointment is created successfully."""
        assert self.appointment.customer == self.customer
        assert self.appointment.barber == self.barber
        assert self.appointment.status == "pending"
        assert isinstance(self.appointment.appointment_date, datetime)
        assert self.appointment.notes == "First appointment"

    def test_str_method(self):
        """Test the string representation of an appointment."""
        expected_str = (
            f"{self.customer.username} with {self.barber.user.username} on "
            f"{self.appointment.appointment_date.strftime('%Y-%m-%d %H:%M')}"
        )
        assert str(self.appointment) == expected_str

    def test_default_status(self):
        """Test that new appointments default to 'pending' status."""
        new_appointment = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=timezone.now()
        )
        assert new_appointment.status == "pending"

    def test_related_name_access(self):
        """Test that related names for customer and barber work correctly."""
        assert self.customer.appointments.count() == 1
        assert self.barber.appointments.count() == 1
        assert self.appointment in self.customer.appointments.all()
        assert self.appointment in self.barber.appointments.all()

    def test_status_choices(self):
        """Test that appointment status can be set to different valid choices."""
        # Test all status choices
        statuses = ['pending', 'completed', 'cancelled']
        for status in statuses:
            appointment = Appointment.objects.create(
                customer=self.customer,
                barber=self.barber,
                appointment_date=timezone.now(),
                status=status
            )
            assert appointment.status == status
            appointment.delete()
    
    def test_appointment_with_nullable_fields(self):
        """Test that appointments can be created with nullable barber/customer."""
        # Test appointment with only customer
        appointment_customer_only = Appointment.objects.create(
            customer=self.customer,
            appointment_date=timezone.now(),
            status="pending"
        )
        assert appointment_customer_only.customer == self.customer
        assert appointment_customer_only.barber is None
        
        # Test appointment with only barber
        appointment_barber_only = Appointment.objects.create(
            barber=self.barber,
            appointment_date=timezone.now(),
            status="pending"
        )
        assert appointment_barber_only.barber == self.barber
        assert appointment_barber_only.customer is None
        
        # Clean up
        appointment_customer_only.delete()
        appointment_barber_only.delete()


@pytest.mark.django_db
def test_appointment_admin_displays_status_and_notes():
    """Admin should show the friendly status label and notes preview."""
    site = AdminSite()
    admin = AppointmentAdmin(Appointment, site)

    customer = CustomUser.objects.create_user(
        username="admin_customer",
        password="testpass123",
        role="customer"
    )
    barber_user = CustomUser.objects.create_user(
        username="admin_barber",
        password="testpass123",
        role="barber"
    )
    barber = Barber.objects.create(user=barber_user)

    appointment = Appointment.objects.create(
        customer=customer,
        barber=barber,
        appointment_date=timezone.now(),
        status="pending",
        notes="This is a lengthy note that should be truncated in the admin preview to avoid overflow."
    )

    assert "status_display" in admin.list_display
    assert admin.status_display(appointment) == "Pending"

    preview = admin.notes_preview(appointment)
    assert preview.startswith("This is a lengthy note")
    assert preview.endswith("…")

    appointment.notes = "Short note"
    appointment.save()
    assert admin.notes_preview(appointment) == "Short note"
