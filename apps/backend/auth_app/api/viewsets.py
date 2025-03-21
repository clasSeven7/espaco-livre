from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Verifica se o email já existe
            if models.AuthCliente.objects.filter(email=request.data['email']).exists():
                return Response(
                    {'message': 'Este email já está em uso'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Verifica se o nome de usuário já existe
            if models.AuthCliente.objects.filter(nome_usuario=request.data['nome_usuario']).exists():
                return Response(
                    {'message': 'Este nome de usuário já está em uso'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AuthAlocadorViewSet(viewsets.ModelViewSet):
    queryset = models.AuthAlocador.objects.all()
    serializer_class = AuthAlocadorSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Verifica se o email já existe
            if models.AuthAlocador.objects.filter(email=request.data['email']).exists():
                return Response(
                    {'message': 'Este email já está em uso'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Verifica se o nome de usuário já existe
            if models.AuthAlocador.objects.filter(nome_usuario=request.data['nome_usuario']).exists():
                return Response(
                    {'message': 'Este nome de usuário já está em uso'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Verifica se o CPF já existe
            if models.AuthAlocador.objects.filter(cpf=request.data['cpf']).exists():
                return Response(
                    {'message': 'Este CPF já está cadastrado'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


