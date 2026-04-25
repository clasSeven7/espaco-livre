from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Cliente, Locatario
from .serializers import ClienteSerializer, LocatarioSerializer


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class LocatarioViewSet(viewsets.ModelViewSet):
    queryset = Locatario.objects.all()
    serializer_class = LocatarioSerializer


def _gerar_token(id: int, tipo: str) -> str:
    token = RefreshToken()
    token['id'] = id
    token['tipo'] = tipo
    return str(token.access_token)


@api_view(['POST'])
def login(request):
    nome_usuario = request.data.get('nome_usuario')
    senha = request.data.get('senha')

    if not nome_usuario or not senha:
        return Response(
            {'message': 'nome_usuario e senha são obrigatórios.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        cliente = Cliente.objects.get(nome_usuario=nome_usuario, senha=senha)
        dados = ClienteSerializer(cliente).data
        return Response({
            'token': _gerar_token(cliente.id, 'cliente'),
            'usuario': {**dados, 'tipo': 'cliente'},
            'message': 'Login realizado com sucesso! Bem-vindo(a)!',
        })
    except Cliente.DoesNotExist:
        pass

    try:
        locatario = Locatario.objects.get(nome_usuario=nome_usuario, senha=senha)
        dados = LocatarioSerializer(locatario).data
        return Response({
            'token': _gerar_token(locatario.id, 'locatario'),
            'usuario': {**dados, 'tipo': 'locatario'},
            'message': 'Login realizado com sucesso! Bem-vindo(a)!',
        })
    except Locatario.DoesNotExist:
        pass

    return Response(
        {'message': 'Usuário ou senha inválidos. Por favor, verifique suas credenciais.'},
        status=status.HTTP_401_UNAUTHORIZED,
    )
