from rest_framework import serializers
from .models import UserGroup, User
from drf_writable_nested.serializers import WritableNestedModelSerializer


class UserGroupSerializer(serializers.ModelSerializer):
    user_count = serializers.IntegerField(
        source='user_set.count', 
        read_only=True
    )
    
    class Meta:
        model = UserGroup
        fields = ['id', 'name', 'description', 'user_count']


class UserSerializer(WritableNestedModelSerializer):
    group = UserGroupSerializer()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'created', 'group']
    