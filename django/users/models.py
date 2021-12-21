from django.db import models
from datetime import datetime

from django.db.models.deletion import CASCADE

class UserGroup(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=500, null=True, blank=True)
    
    def __str__(self):
        return f'{self.name}'
    
class User(models.Model):
    username = models.CharField(max_length=30)
    created = models.DateTimeField(default=datetime.now)
    group = models.ForeignKey(UserGroup, on_delete=models.PROTECT, blank=True, null=True)
    
    def __str__(self):
        return f'{self.username}'
    