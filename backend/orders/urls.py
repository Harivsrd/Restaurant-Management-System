from django.urls import path 

from .views import (create_order, order_history, dashboard_stats, create_payment_order, verify_payment)

urlpatterns = [
    path('create/', create_order),
    path('history/', order_history),
    path('dashboard/', dashboard_stats),
    path('create-payment/', create_payment_order),
    path('verify-payment/', verify_payment),
]