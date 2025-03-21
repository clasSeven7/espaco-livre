from rest_framework import serializers
from auth_app import models
from django.contrib.auth.hashers import make_password


class AuthLoginSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.AuthLogin
    fields = '__all__'

class AuthClienteSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.AuthCliente
    fields = [
      'email',
      'senha',
      'nome_usuario',
      'telefone',
      'idade',
      'endereco_residencial',
      'cidade',
      'cep',
      'tipo_ocupacao',
      'frequencia_uso',
    ]
    extra_kwargs = {
      'senha': {'write_only': True}
    }

  def validate_senha(self, value):
    return make_password(value)

class AuthAlocadorSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.AuthAlocador
    fields = [
      'email',
      'senha',
      'nome_usuario',
      'telefone',
      'idade',
      'endereco_residencial',
      'cidade',
      'cpf',
      'cep',
      'aceitar_termos',
    ]
    extra_kwargs = {
      'senha': {'write_only': True}
    }

  def validate_senha(self, value):
    return make_password(value)

