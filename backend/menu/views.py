from rest_framework.response import Response
from rest_framework.decorators import ( api_view , permission_classes )
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

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

@api_view(['POST'])

@permission_classes([IsAuthenticated])

def toggle_favorite(request, item_id):

    user = request.user

    item = MenuItem.objects.get(
        id=item_id
    )

    if user in item.favorites.all():

        item.favorites.remove(user)

        return Response({
            "message":
            "Removed from favorites"
        })

    else:

        item.favorites.add(user)

        return Response({
            "message":
            "Added to favorites"
        })
        
        
@api_view(['GET'])

@permission_classes([IsAuthenticated])

def favorite_items(request):

    user = request.user

    items = user.favorite_items.all()

    serializer = MenuItemSerializer(
        items,
        many=True
    )

    return Response(serializer.data)