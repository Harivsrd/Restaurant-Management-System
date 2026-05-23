from django.urls import path 

from .views import create_reservation, reservation_history

urlpatterns = [
    path('create/', create_reservation),
    path('history/', reservation_history),
]