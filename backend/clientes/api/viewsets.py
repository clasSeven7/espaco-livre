from clientes.api.serializers import ClienteSerializer
from clientes.models import Cliente
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.response import Response


def _primeiro_erro(errors: dict) -> tuple[str, str]:
    field = next(iter(errors))
    return str(errors[field][0]), field


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all().order_by("nome_usuario")
    serializer_class = ClienteSerializer
    swagger_tags = ["clientes"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {"error": mensagem, "field": field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        nome_usuario = serializer.validated_data["nome_usuario"]
        email = serializer.validated_data["email"]
        senha = serializer.validated_data["senha"]
        try:
            cliente = serializer.save()
            User.objects.create_user(username=nome_usuario, email=email, password=senha)
            return Response(
                {
                    "message": "Cliente cadastrado com sucesso",
                    "data": ClienteSerializer(cliente).data,
                },
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError:
            return Response(
                {"error": "Email ou usuário já cadastrado.", "field": "email"},
                status=status.HTTP_409_CONFLICT,
            )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {"error": mensagem, "field": field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        cliente = serializer.save()
        return Response(
            {
                "message": "Cliente atualizado com sucesso",
                "data": ClienteSerializer(cliente).data,
            }
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Cliente removido com sucesso"}, status=status.HTTP_200_OK
        )
