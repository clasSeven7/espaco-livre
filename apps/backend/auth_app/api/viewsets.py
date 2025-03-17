from rest_framework import viewsets, permissions
from auth_app import models
from .serializers import AuthLoginSerializer, AuthClienteSerializer, AuthAlocadorSerializer


class AuthLoginViewSet(viewsets.ModelViewSet):
    queryset = models.AuthLogin.objects.all()
    serializer_class = AuthLoginSerializer
    # permission_classes = [permissions.IsAuthenticated]

class AuthClienteViewSet(viewsets.ModelViewSet):
    queryset = models.AuthCliente.objects.all()
    serializer_class = AuthClienteSerializer
    # permission_classes = [permissions.IsAuthenticated]

class AuthAlocadorViewSet(viewsets.ModelViewSet):
    queryset = models.AuthAlocador.objects.all()
    serializer_class = AuthAlocadorSerializer
    # permission_classes = [permissions.IsAuthenticated]


