from django.shortcuts import render
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from rest_framework import viewsets

from .models import UserGroup, User
from .serializers import UserGroupSerializer, UserSerializer


# @api_view(["GET"])
# def list_users(request):
#     users = User.objects.all()
#     serializer = UserSerializer(users, many=True)
#     content = {
#         "users": serializer.data,
#     }
    
#     return Response(content)


# @api_view(["GET"])
# def list_user_groups(request):
#     user_groups = UserGroup.objects.all()
#     serializer = UserGroupSerializer(user_groups, many=True)
#     content = {
#         "user_groups": serializer.data,
#     }
    
#     return Response(content)



class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        return User.objects.all()
    
    
class UserGroupViewSet(viewsets.ModelViewSet):
    serializer_class = UserGroupSerializer
    
    def get_queryset(self):
        return UserGroup.objects.all()