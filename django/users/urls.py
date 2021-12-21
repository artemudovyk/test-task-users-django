from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, 'user')
router.register(r'user_groups', views.UserGroupViewSet, 'user_group')



urlpatterns = [
    # path("list_users/", views.list_users),
    # path("list_user_groups/", views.list_user_groups),
    # path("user_detail/<int:pk>/", views.user_detail),
    # path("user_group_detail/<int:pk>/", views.user_group_detail),
    path('', include(router.urls))
]
