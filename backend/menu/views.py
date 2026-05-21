from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import MenuItem
from .serializer import MenuItemSerializer

@api_view(['GET'])
def menu_list(request):
    items = MenuItem.objects.all()
    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data)

