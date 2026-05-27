from rest_framework.response import Response
from rest_framework.decorators import ( api_view , permission_classes )
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from django.db.models import Avg, Count

from .models import MenuItem
from .serializer import MenuItemSerializer

from .models import Review
from .serializer import (ReviewSerializer)

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_review(request, item_id):
    item = MenuItem.objects.get(id=item_id)
    review = Review.objects.create(
        user = request.user,
        menu_item = item,
        rating = request.data.get("rating"),
        comment = request.data.get("comment")
    )
    serializer = ReviewSerializer(review)
    
    return Response(serializer.data)

@api_view(['GET'])
def get_review(request, item_id):
    item = MenuItem.objects.get(id=item_id)
    reviews = item.reviews.all()
    serializer = ReviewSerializer(reviews, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def rating_stats(request, item_id):
    item = MenuItem.objects.get(id=item_id)
    stats = item.reviews.aggregate(
        average_rating = Avg('rating'),
        total_reviews = Count('id')
    )
    
    return Response(stats)

@api_view(["GET"])
def popular_items(request):
    items = MenuItem.objects.annotate(
        average_rating = Avg("reviews__rating"),
        review_count = Count('reviews')
    ).order_by('-average_rating')[:5]
    serializer = MenuItemSerializer(items, many=True)
    
    return Response(serializer.data)