from rest_framework import generics, permissions
from .models import Appointment
from .serializers import AppointmentSerializer

class AppointmentCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'barber_profile'):
            return Appointment.objects.filter(barber=user.barber_profile)
        return Appointment.objects.filter(customer=user)

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
