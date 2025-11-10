from django.contrib.auth import authenticate
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from users.models import CustomUser
from barbers.models import Barber
from appointments.models import Appointment
from .serializers import (
    UserSerializer,
    BarberSerializer,
    AppointmentSerializer,
)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = CustomUser.objects.create_user(
        username=request.data['username'],
        email=request.data['email'],
        password=request.data['password'],
        first_name=request.data.get('first_name', ''),
        last_name=request.data.get('last_name', ''),
        role=request.data.get('role', 'customer'),
        phone_number=request.data.get('phone_number', ''),
    )

    token, _ = Token.objects.get_or_create(user=user)
    return Response(
        {'token': token.key, 'user': UserSerializer(user).data},
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if not user:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'user': UserSerializer(user).data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    return Response(UserSerializer(request.user).data)


class BarberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Barber.objects.select_related('user').all()
    serializer_class = BarberSerializer
    permission_classes = [AllowAny]


class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        qs = Appointment.objects.select_related('customer', 'barber', 'barber__user')
        if user.role == 'barber':
            return qs.filter(barber__user=user).order_by('-appointment_date')
        elif user.role == 'admin':
            return qs.order_by('-appointment_date')
        return qs.filter(customer=user).order_by('-appointment_date')

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    @action(detail=False, methods=['get'])
    def my(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)