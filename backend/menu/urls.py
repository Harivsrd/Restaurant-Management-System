from django.urls import path 
from .views import (menu_list , toggle_favorite , favorite_items , add_review , get_review , rating_stats , popular_items )

urlpatterns = [
    path('', menu_list),
    path('favorites/',favorite_items),
    path('favorite/<int:item_id>/',toggle_favorite),
    path('review/<int:item_id>/', add_review),
    path('reviews/<int:item_id>/', get_review),
    path('rating-stats/<int:item_id>/', rating_stats),
    path('popular/', popular_items),
]