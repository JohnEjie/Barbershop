import pytest
from datetime import datetime
from django.utils import timezone
from users.models import CustomUser
from barbers.models import Barber
from appointments.models import Appointment


@pytest.mark.django_db
class TestBarberModel:
    """Test cases for the Barber model."""

    def setup_method(self):
        """Set up sample barber user and barber before each test."""
        # Create a barber user
        self.barber_user = CustomUser.objects.create_user(
            username="barber1",
            email="barber1@example.com",
            password="testpass123",
            role="barber"
        )

        # Create the barber profile
        self.barber = Barber.objects.create(
            user=self.barber_user,
            bio="Professional barber with 5 years of experience",
            experience_years=5,
            specialization="Fade cuts and modern styles"
        )

    def test_barber_creation(self):
        """Test that a barber can be created and linked to a CustomUser."""
        assert self.barber.user == self.barber_user
        assert self.barber.user.username == "barber1"
        assert self.barber.user.role == "barber"
        assert self.barber.bio == "Professional barber with 5 years of experience"
        assert self.barber.experience_years == 5
        assert self.barber.specialization == "Fade cuts and modern styles"

    def test_barber_str_method(self):
        """Test the string representation of a barber."""
        assert str(self.barber) == "barber1"

    def test_barber_default_values(self):
        """Test that barber fields have correct default values."""
        # Create a barber with minimal fields
        new_user = CustomUser.objects.create_user(
            username="barber2",
            password="testpass123",
            role="barber"
        )
        minimal_barber = Barber.objects.create(user=new_user)
        
        assert minimal_barber.experience_years == 0
        assert minimal_barber.bio == ""
        assert minimal_barber.specialization == ""
        
        minimal_barber.delete()
        new_user.delete()

    def test_barber_one_to_one_relationship(self):
        """Test that OneToOneField relationship works correctly."""
        # A user can only have one barber profile
        assert self.barber.user.barber == self.barber
        
        # Try to create another barber with the same user should fail
        with pytest.raises(Exception):  # Should raise IntegrityError
            Barber.objects.create(user=self.barber_user)

    def test_barber_blank_fields(self):
        """Test that bio and specialization can be blank."""
        new_user = CustomUser.objects.create_user(
            username="barber3",
            password="testpass123",
            role="barber"
        )
        barber_with_blanks = Barber.objects.create(
            user=new_user,
            bio="",
            specialization=""
        )
        
        assert barber_with_blanks.bio == ""
        assert barber_with_blanks.specialization == ""
        
        barber_with_blanks.delete()
        new_user.delete()

    def test_barber_cascade_delete(self):
        """Test that deleting a user also deletes the barber profile."""
        barber_id = self.barber.id
        user_id = self.barber_user.id
        
        # Delete the user
        self.barber_user.delete()
        
        # Barber should also be deleted
        assert not Barber.objects.filter(id=barber_id).exists()
        assert not CustomUser.objects.filter(id=user_id).exists()


@pytest.mark.django_db
class TestBarberPendingAppointments:
    """Test cases for the pending_appointments_details property."""

    def setup_method(self):
        """Set up barber, customer, and appointments for testing."""
        # Create a barber user
        self.barber_user = CustomUser.objects.create_user(
            username="barber1",
            password="testpass123",
            role="barber"
        )
        self.barber = Barber.objects.create(
            user=self.barber_user,
            bio="Expert barber",
            experience_years=3
        )

        # Create a customer user
        self.customer = CustomUser.objects.create_user(
            username="customer1",
            password="testpass123",
            role="customer"
        )

    def test_pending_appointments_details_no_appointments(self):
        """Test pending_appointments_details when there are no appointments."""
        result = self.barber.pending_appointments_details
        assert result == "No pending appointments"

    def test_pending_appointments_details_with_pending(self):
        """Test pending_appointments_details with pending appointments."""
        # Create pending appointments
        appointment1 = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=timezone.now(),
            status="pending",
            notes=""
        )
        
        # Create another customer for second appointment
        customer2 = CustomUser.objects.create_user(
            username="customer2",
            password="testpass123",
            role="customer"
        )
        appointment2 = Appointment.objects.create(
            customer=customer2,
            barber=self.barber,
            appointment_date=timezone.now() + timezone.timedelta(hours=2),
            status="pending",
            notes=""
        )

        result = self.barber.pending_appointments_details
        
        # Should return a list
        assert isinstance(result, list)
        assert len(result) == 2
        
        # Check format of each entry
        assert "customer1 on" in result[0] or "customer2 on" in result[0]
        assert "customer1 on" in result[1] or "customer2 on" in result[1]
        
        # Clean up
        customer2.delete()

    def test_pending_appointments_details_excludes_non_pending(self):
        """Test that pending_appointments_details only shows pending appointments."""
        # Create appointments with different statuses
        pending_appt = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=timezone.now(),
            status="pending",
            notes=""
        )
        
        completed_appt = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=timezone.now() + timezone.timedelta(hours=1),
            status="completed",
            notes=""
        )
        
        cancelled_appt = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=timezone.now() + timezone.timedelta(hours=2),
            status="cancelled",
            notes=""
        )

        result = self.barber.pending_appointments_details
        
        # Should only return pending appointment
        assert isinstance(result, list)
        assert len(result) == 1
        assert "customer1 on" in result[0]

    def test_pending_appointments_details_format(self):
        """Test that pending_appointments_details returns correct format."""
        # Create a specific datetime for testing
        test_datetime = timezone.make_aware(datetime(2024, 1, 15, 14, 30))
        appointment = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=test_datetime,
            status="pending",
            notes=""
        )

        result = self.barber.pending_appointments_details
        
        assert isinstance(result, list)
        assert len(result) == 1
        # Check the format: "username on YYYY-MM-DD HH:MM"
        assert result[0] == "customer1 on 2024-01-15 14:30"
