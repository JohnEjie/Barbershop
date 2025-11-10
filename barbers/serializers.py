from rest_framework import serializers
from users.models import CustomUser   # ✅ Import your custom user model
from barbers.models import Barber
from appointments.models import Appointment  # if you reference appointments

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "first_name", "last_name", "role"]

class BarberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Barber
        fields = ["id", "user", "bio", "experience_years", "specialization"]

class AppointmentSerializer(serializers.ModelSerializer):
    barber = BarberSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ["id", "barber", "appointment_date", "status", "notes"]
