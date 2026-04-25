import re

from espacos.models import Espaco
from locatarios.api.serializers import LocatarioSerializer
from rest_framework import serializers


class EspacoSerializer(serializers.ModelSerializer):
    locatario_detalhe = LocatarioSerializer(source="locatario", read_only=True)

    class Meta:
        model = Espaco
        fields = "__all__"

    def validate_cep(self, value):
        cep = re.sub(r"\D", "", value)
        if not re.match(r"^\d{8}$", cep):
            raise serializers.ValidationError("CEP inválido.")
        return cep

    def validate_capacidade(self, value):
        if value <= 0:
            raise serializers.ValidationError("A capacidade deve ser maior que zero.")
        return value

    def validate_preco_por_hora(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "O preço por hora deve ser maior que zero."
            )
        return value
