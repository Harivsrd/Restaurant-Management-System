from django.urls import path 

from .views import (create_order, order_history, dashboard_stats, create_payment_order)

urlpatterns = [
    path('create/', create_order),
    path('history/', order_history),
    path('dashboard/', dashboard_stats),
    path('create-payment/', create_payment_order),
    
]