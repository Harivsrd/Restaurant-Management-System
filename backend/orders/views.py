from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.db.models import Sum 
from django.core.mail import send_mail 

from reservations.models import Reservation

from .models import Order 

from .serializers import OrderSerializer

from django.contrib.auth.models import User 
from django.conf import settings 

import razorpay

@api_view(['POST'])
def create_order(request):
    
    user = User.objects.first() 
    
    total_price = request.data.get("total_price")
    
    order = Order.objects.create(
        user=user,
        total_price=total_price
    )
    send_mail('Order Confirmation',
              f"Your order #{order.id} has been placed succesfully.",
              settings.EMAIL_HOST_USER,
              [request.user.email],
              fail_silently=True)
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
        Order.objects.aggregate(Sum('total_price'))['total_price__sum'] or 0
    )
    data = {
        "total_orders": total_orders,
        "total_reservations": total_reservations,
        "total_users": total_users,
        "total_revenue": total_revenue
    }
    
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])

def create_payment_order(request):
    amount = int(float(request.data.get("amount"))*100)
    client = razorpay.Client(
        auth=(
            settings.RAZORPAY_KEY_ID,
            settings.RAZORPAY_KEY_SECRET
        )
    )
    payment_order = client.order.create([
        "amount": amount,
        "currency": "INR",
        "payment_capture": 1
    ])
    
    return Response(payment_order)