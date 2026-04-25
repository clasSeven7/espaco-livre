from rest_framework import serializers
from .models import Cliente, Locatario


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        extra_kwargs = {'senha': {'write_only': True}}


class LocatarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locatario
        fields = '__all__'
        extra_kwargs = {'senha': {'write_only': True}}
