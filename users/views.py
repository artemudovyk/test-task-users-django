from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from .models import UserGroup, User
from .serializers import UserGroupSerializer, UserSerializer


@api_view(["GET"])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    content = {
        "users": serializer.data,
    }
    
    return Response(content)