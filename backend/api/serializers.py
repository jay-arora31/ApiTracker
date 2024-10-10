from rest_framework import serializers
from .models import APIHit,Todo

class APIHitSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIHit
        fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['task_name']