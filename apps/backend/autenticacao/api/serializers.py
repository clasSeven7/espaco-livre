from autenticacao import models
from rest_framework import serializers


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cliente
        fields = '__all__'


class AlocadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Alocador
        fields = '__all__'
