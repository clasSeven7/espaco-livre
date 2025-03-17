from rest_framework import viewsets, permissions
from auth_app import models
from .serializers import AuthLoginSerializer, AuthClienteSerializer, AuthAlocadorSerializer


class AuthLoginViewSet(viewsets.ModelViewSet):
    queryset = models.AuthLogin.objects.all()
    serializer_class = AuthLoginSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.AuthLogin.objects.filter(id=self.request.user.id)


class AuthClienteViewSet(viewsets.ModelViewSet):
    queryset = models.AuthCliente.objects.all()
    serializer_class = AuthClienteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.AuthCliente.objects.filter(id=self.request.user.id)


class AuthAlocadorViewSet(viewsets.ModelViewSet):
    queryset = models.AuthAlocador.objects.all()
    serializer_class = AuthAlocadorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.AuthAlocador.objects.filter(id=self.request.user.id)


