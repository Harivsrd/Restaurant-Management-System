from rest_framework.decorators import api_view

from rest_framework.response import Response

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
