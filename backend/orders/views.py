from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.db.models import Sum 

from reservations.models import Reservation

from .models import Order 

from .serializers import OrderSerializer

from django.contrib.auth.models import User 

@api_view(['POST'])
def create_order(request):
    
    user = User.objects.first() 
    
    total_price = request.data.get("total_price")
    
    order = Order.objects.create(
        user=user,
        total_price=total_price
    )
    serializer = OrderSerializer(order)
    
    return Response(serializer.data)

@api_view(['GET'])
def order_history(request):
    orders = Order.objects.all().order_by('-created_at')
    serializer = OrderSerializer(
        orders, many = True
    )
    
    return Response(serializer.data)

@api_view(['GET'])
def dashboard_stats(request):
    total_orders = Order.objects.count()
    total_reservations = (Reservation.objects.count())
    total_users = User.objects.count()
    total_revenue = (
        Order.objects.aggregate(Sum('total_price'))['total_price_sum'] or 0
    )
    data = {
        "total_orders": total_orders,
        "total_reservations": total_reservations,
        "total_users": total_users,
        "total_revenue": total_revenue
    }
    
    return Response(data)