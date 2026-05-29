from django.contrib import admin

from .models import Order 

admin.site.register(Order)
class OrderAdmin(admin.ModelAdmin):
    
    list_display = (
        'id',
        'user',
        'total_price',
        'status',
        'created_at'
    )
    
    list_filter = ('status',)
