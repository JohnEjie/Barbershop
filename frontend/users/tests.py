from django.test import TestCase
from datetime import datetime

from django.contrib.admin.sites import AdminSite
from django.contrib.auth import get_user_model
from django.utils import timezone

from appointments.models import Appointment
from barbers.models import Barber
from users.admin import CustomUserAdmin

class SuperUserCreationTest(TestCase):
    def setUp(self):
        self.User = get_user_model()

    def test_create_superuser(self):
        # Create a superuser (admin)
        admin_user = self.User.objects.create_superuser(
            username='admin_test',
            email='admin@test.com',
            password='admin123'
        )

        self.assertEqual(admin_user.username, 'admin_test')
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        self.assertEqual(admin_user.role, 'admin')
        self.assertTrue(admin_user.check_password('admin123'))

        print("✅ Superuser creation test passed successfully.")


class NormalUserCreationTest(TestCase):
    def setUp(self):
        self.User = get_user_model()

    def test_create_user(self):
        # Create a normal user (customer)
        user = self.User.objects.create_user(
            username='customer_test',
            email='customer@test.com',
            password='cust123',
            role='customer'
        )

        self.assertEqual(user.username, 'customer_test')
        self.assertEqual(user.email, 'customer@test.com')
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.check_password('cust123'))
        self.assertEqual(user.role, 'customer')

        print("✅ Normal user creation test passed successfully.")


class CustomUserAdditionalTests(TestCase):
    def setUp(self):
        self.User = get_user_model()

    def test_default_role_is_customer(self):
        user = self.User.objects.create_user(
            username='no_role_user',
            email='norole@test.com',
            password='pass123'
        )
        self.assertEqual(user.role, 'customer')

    def test_str_representation(self):
        user = self.User.objects.create_user(
            username='john',
            email='john@test.com',
            password='pass123',
            role='barber'
        )
        self.assertEqual(str(user), 'john (barber)')

    def test_create_user_without_username_raises(self):
        with self.assertRaisesMessage(ValueError, 'The Username field is required'):
            self.User.objects.create_user(
                username='',
                email='nouser@test.com',
                password='pass123'
            )


class CustomUserAdminAppointmentsTest(TestCase):
    def setUp(self):
        self.site = AdminSite()
        self.User = get_user_model()
        self.admin = CustomUserAdmin(self.User, self.site)

        self.customer = self.User.objects.create_user(
            username='customer_admin',
            email='customer_admin@test.com',
            password='cust123',
            role='customer'
        )
        self.barber_user = self.User.objects.create_user(
            username='barber_admin',
            email='barber_admin@test.com',
            password='barber123',
            role='barber'
        )
        self.barber = Barber.objects.create(user=self.barber_user)

    def test_appointment_dates_without_appointments(self):
        display = self.admin.appointment_dates(self.customer)
        self.assertEqual(display, 'No appointments')

    def test_appointment_dates_excludes_completed(self):
        pending_time = timezone.make_aware(datetime(2024, 1, 2, 12, 30))
        completed_time = timezone.make_aware(datetime(2024, 1, 1, 10, 0))

        Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=pending_time,
            status='pending',
            notes='Upcoming appointment'
        )
        Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=completed_time,
            status='completed',
            notes='Old appointment'
        )

        display = self.admin.appointment_dates(self.customer)
        self.assertEqual(display, '2024-01-02 12:30')

    def test_appointment_dates_removed_after_completion(self):
        pending_time = timezone.make_aware(datetime(2024, 1, 2, 12, 30))

        appointment = Appointment.objects.create(
            customer=self.customer,
            barber=self.barber,
            appointment_date=pending_time,
            status='pending',
            notes='Upcoming appointment'
        )

        display_pending = self.admin.appointment_dates(self.customer)
        self.assertEqual(display_pending, '2024-01-02 12:30')

        appointment.status = 'completed'
        appointment.save()

        display_after_complete = self.admin.appointment_dates(self.customer)
        self.assertEqual(display_after_complete, 'No appointments')