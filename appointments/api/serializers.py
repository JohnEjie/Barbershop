from rest_framework import serializers
from users.models import CustomUser
from barbers.models import Barber
from appointments.models import Appointment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email',
            'first_name', 'last_name',
            'role', 'phone_number',
        ]


class BarberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    pending_appointments_list = serializers.SerializerMethodField()

    class Meta:
        model = Barber
        fields = [
            'id', 'user', 'bio',
            'experience_years', 'specialization',
            'pending_appointments_list',
        ]

    def get_pending_appointments_list(self, obj):
        pending = obj.pending_appointments_details
        if isinstance(pending, list):
            return ", ".join(pending)
        return pending


class AppointmentSerializer(serializers.ModelSerializer):
    customer = UserSerializer(read_only=True)
    barber = BarberSerializer(read_only=True)
    barber_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'customer', 'barber', 'barber_id',
            'appointment_date', 'status',
            'notes',
        ]

    def create(self, validated_data):
        request = self.context['request']
        barber_id = validated_data.pop('barber_id')
        appointment = Appointment.objects.create(
            customer=request.user,
            barber_id=barber_id,
            **validated_data
        )
        return appointment