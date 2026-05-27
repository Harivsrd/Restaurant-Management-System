from django.urls import path 
from .views import (menu_list , toggle_favorite , favorite_items , add_review , get_review )

urlpatterns = [
    path('', menu_list),
    path('favorites/',favorite_items),
    path('favorite/<int:item_id>/',toggle_favorite),
    path('reviews/<int:item_id>', add_review),
    path('reviews/<int:item_id>', get_review),
]