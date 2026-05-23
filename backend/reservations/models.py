from django.db import models

from django.contrib.auth.models import User  

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reservation_date = models.DateField()
    reservation_time = models.TimeField()
    guests = models.IntegerField() 
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Reservation {self.id}"
