from rest_framework.decorators import api_view

from rest_framework.response import Response

from .models import Reservation

from .serializers import ReservationSerializer

from django.contrib.auth.models import User 

@api_view(['POST'])
def create_reservation(request):
    user = User.objects.first()
    reservation = Reservation.objects.create(
        user=user, reservation_date = request.data.get("reservation_date"),
        reservation_time = request.data.get("reservation_time"),
        guests = request.data.get("guests")
    )
    
    serializer = ReservationSerializer(reservation)
    
    return Response(serializer.data)


@api_view(['GET'])
def reservation_history(request):
    reservations = Reservation.objects.all() 
    serializer = ReservationSerializer(reservations, many=True)
    
    return Response(serializer.data)