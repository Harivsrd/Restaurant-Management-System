from django.urls import path 

from .views import (create_order, order_history)

urlpatterns = [
    path('create/', create_order),
    path('history/', create_order)
]