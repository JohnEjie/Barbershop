from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Barber
from .serializers import BarberSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_barbers(request):
    barbers = Barber.objects.select_related('user').all()
    serializer = BarberSerializer(barbers, many=True)
    return Response(serializer.data)
