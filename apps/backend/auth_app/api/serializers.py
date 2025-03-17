from rest_framework import serializers
from auth_app import models


class AuthLoginSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.AuthLogin
    fields = '__all__'

class AuthClienteSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.AuthCliente
    fields = '__all__'

class AuthAlocadorSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.AuthAlocador
    fields = '__all__'

