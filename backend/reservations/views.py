from rest_framework.decorators import api_view

from rest_framework.response import Response

from .models import Reservation

from .serializers import ReservationSerializer

from django.contrib.auth.models import User 
from datetime import date 

@api_view(['POST'])
def create_reservation(request):
    reservation_date = request.data.get("reservation_date")
    guests = int(request.data.get("guests"))
    if guests <= 0:
        return Response({"error":"Guests must be greater than 0"}, status=400)
    
    if reservation_date < str(date.today()):
        return Response({"error":"Connot book past dates"}, status=400)
    
    
    
    user = User.objects.first()
    reservation = Reservation.objects.create(
        user=user, 
        reservation_date = reservation_date,
        reservation_time = request.data.get("reservation_time"),
        guests = guests
    )
    
    serializer = ReservationSerializer(reservation)
    
    return Response(serializer.data)


@api_view(['GET'])
def reservation_history(request):
    reservations = Reservation.objects.all() 
    serializer = ReservationSerializer(reservations, many=True)
    
    return Response(serializer.data)