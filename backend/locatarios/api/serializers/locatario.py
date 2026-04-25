import re

from locatarios.models import Locatario
from rest_framework import serializers


class LocatarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locatario
        fields = "__all__"
        extra_kwargs = {"senha": {"write_only": True}}

    def validate_email(self, value):
        if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", value):
            raise serializers.ValidationError("Email inválido.")
        return value

    def validate_senha(self, value):
        if len(value) < 6:
            raise serializers.ValidationError(
                "A senha deve ter no mínimo 6 caracteres."
            )
        return value

    def validate_idade(self, value):
        if value is not None and value < 18:
            raise serializers.ValidationError(
                "É necessário ter 18 anos ou mais para se cadastrar."
            )
        return value

    def validate_cpf(self, value):
        cpf = re.sub(r"\D", "", value)
        if not re.match(r"^\d{11}$", cpf):
            raise serializers.ValidationError("CPF inválido.")
        return cpf

    def validate_cep(self, value):
        if value:
            return re.sub(r"\D", "", value)
        return value

    def validate_telefone(self, value):
        if value:
            return re.sub(r"\D", "", value)
        return value
