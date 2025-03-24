from autenticacao import models
from rest_framework import viewsets

from .serializers import AlocadorSerializer, ClienteSerializer


class AuthClienteViewSet(viewsets.ModelViewSet):
    queryset = models.AuthCliente.objects.all()
    serializer_class = ClienteSerializer


class AuthAlocadorViewSet(viewsets.ModelViewSet):
    queryset = models.AuthAlocador.objects.all()
    serializer_class = AlocadorSerializer
