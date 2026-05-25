from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination

from .models import MenuItem
from .serializer import MenuItemSerializer

#menu list api 
@api_view(['GET'])
def menu_list(request):
    items = MenuItem.objects.all()
    paginator = PageNumberPagination()
    paginator.page_size = 6
    result_page = paginator.paginate_queryset(items, request)
    serializer = MenuItemSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

