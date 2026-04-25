from django.db import IntegrityError
from locatarios.api.serializers import LocatarioSerializer
from locatarios.models import Locatario
from rest_framework import status, viewsets
from rest_framework.response import Response


def _primeiro_erro(errors: dict) -> tuple[str, str]:
    field = next(iter(errors))
    return str(errors[field][0]), field


class LocatarioViewSet(viewsets.ModelViewSet):
    queryset = Locatario.objects.all().order_by("nome_usuario")
    serializer_class = LocatarioSerializer
    swagger_tags = ["locatarios"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {"error": mensagem, "field": field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            locatario = serializer.save()
            return Response(
                {
                    "message": "Locatário cadastrado com sucesso",
                    "data": LocatarioSerializer(locatario).data,
                },
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError as e:
            campo = "cpf" if "cpf" in str(e).lower() else "email"
            mensagem = "CPF já cadastrado." if campo == "cpf" else "Email já cadastrado."
            return Response(
                {"error": mensagem, "field": campo},
                status=status.HTTP_409_CONFLICT,
            )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response(
            {"message": "Locatário encontrado", "data": LocatarioSerializer(instance).data}
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(
            {
                "message": "Lista de locatários",
                "data": LocatarioSerializer(queryset, many=True).data,
            }
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
        locatario = serializer.save()
        return Response(
            {
                "message": "Locatário atualizado com sucesso",
                "data": LocatarioSerializer(locatario).data,
            }
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Locatário removido com sucesso"}, status=status.HTTP_200_OK
        )
