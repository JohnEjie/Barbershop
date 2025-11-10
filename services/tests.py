from django.test import TestCase
from services.models import Service

class ServiceModelTest(TestCase):
    """Test suite for the Service model."""

    def setUp(self):
        self.service = Service.objects.create(
            name="Classic Haircut",
            description="A traditional haircut with style.",
            price=250.00,
            duration=45
        )

    def test_service_creation(self):
        """Test if the Service object is created successfully."""
        self.assertIsInstance(self.service, Service)
        self.assertEqual(self.service.name, "Classic Haircut")

    def test_string_representation(self):
        """Test the string representation of the Service model."""
        self.assertEqual(str(self.service), "Classic Haircut")

    def test_field_values(self):
        """Test the field values of the created Service object."""
        self.assertEqual(self.service.description, "A traditional haircut with style.")
        self.assertEqual(self.service.price, 250.00)
        self.assertEqual(self.service.duration, 45)

    def test_service_persistence(self):
        """Test if the Service object is saved and can be retrieved."""
        service = Service.objects.get(name="Classic Haircut")
        self.assertEqual(service.price, 250.00)
        self.assertEqual(service.duration, 45)
