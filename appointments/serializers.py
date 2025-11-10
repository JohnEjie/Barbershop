from rest_framework import serializers
from .models import Appointment
from barbers.serializers import BarberSerializer
from users.serializers import UserSerializer


class AppointmentSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    barber = BarberSerializer(read_only=True)
    barber_id = serializers.PrimaryKeyRelatedField(
        queryset=Appointment._meta.get_field('barber').remote_field.model.objects.all(),
        source='barber',
        write_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            'id',
            'customer',
            'barber',
            'barber_id',
            'appointment_date',
            'status',
            'notes',
            'created_at',
        ]
