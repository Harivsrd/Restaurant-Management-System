from django.urls import path 

from .views import (create_order, order_history, dashboard_stats)

urlpatterns = [
    path('create/', create_order),
    path('history/', order_history),
    path('dashboard/', dashboard_stats),
    
]