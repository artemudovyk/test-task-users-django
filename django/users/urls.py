from django.urls import path

from . import views

urlpatterns = [
    path("list_users/", views.list_users),
    path("list_user_groups/", views.list_user_groups),
]
