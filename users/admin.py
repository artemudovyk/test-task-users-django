from django.contrib import admin

from .models import UserGroup, User

@admin.register(UserGroup)
class UserGroupAdmin(admin.ModelAdmin):
    list_display = ('name', )
    
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', )