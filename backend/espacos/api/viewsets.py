from espacos.api.serializers import EspacoSerializer
from espacos.models import Espaco
from rest_framework import status, viewsets
from rest_framework.response import Response


def _primeiro_erro(errors: dict) -> tuple[str, str]:
    field = next(iter(errors))
    return str(errors[field][0]), field


class EspacoViewSet(viewsets.ModelViewSet):
    queryset = Espaco.objects.select_related("locatario").order_by("nome")
    serializer_class = EspacoSerializer
    swagger_tags = ["espacos"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {"error": mensagem, "field": field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        espaco = serializer.save()
        return Response(
            {
                "message": "Espaço cadastrado com sucesso",
                "data": EspacoSerializer(espaco).data,
            },
            status=status.HTTP_201_CREATED,
        )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response(
            {"message": "Espaço encontrado", "data": EspacoSerializer(instance).data}
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        return Response(
            {
                "message": "Lista de espaços",
                "data": EspacoSerializer(queryset, many=True).data,
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
        espaco = serializer.save()
        return Response(
            {
                "message": "Espaço atualizado com sucesso",
                "data": EspacoSerializer(espaco).data,
            }
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Espaço removido com sucesso"}, status=status.HTTP_200_OK
        )
