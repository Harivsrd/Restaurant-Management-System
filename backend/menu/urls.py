from django.urls import path 
from .views import (menu_list , toggle_favorite , favorite_items )

urlpatterns = [
    path('', menu_list),
    path('favorites/', favorite_items),
    path('favorites/<int:item_id>/',toggle_favorite),
]