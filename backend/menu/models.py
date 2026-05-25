from django.db import models
from django.contrib.auth.models import User

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, default="Main Course")
    image = models.ImageField(upload_to='menu_images/', blank=True, null=True)
    favorites = models.ManyToManyField(User, related_name='favorite_items', blank=True)
    
    def __str__(self):
        return self.name 
