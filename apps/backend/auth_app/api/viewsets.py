from auth_app import models
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import (AuthAlocadorSerializer, AuthClienteSerializer,
                          AuthLoginSerializer)


class AuthLoginViewSet(viewsets.ModelViewSet):
    queryset = models.AuthLogin.objects.all()
    serializer_class = AuthLoginSerializer


class AuthClienteViewSet(viewsets.ModelViewSet):
    queryset = models.AuthCliente.objects.all()
    serializer_class = AuthClienteSerializer


class AuthAlocadorViewSet(viewsets.ModelViewSet):
    queryset = models.AuthAlocador.objects.all()
    serializer_class = AuthAlocadorSerializer
