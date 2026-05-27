from rest_framework import serializers
from .models import (MenuItem, Review)

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'
        
class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username',read_only=True)
    
    class Meta:
        model = Review 
        fields = '__all__'