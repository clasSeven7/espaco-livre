from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import IntegrityError
from .models import Cliente, Locatario
from .serializers import ClienteSerializer, LocatarioSerializer


def _gerar_token(id: int, tipo: str) -> str:
    token = RefreshToken()
    token['id'] = id
    token['tipo'] = tipo
    return str(token.access_token)


def _primeiro_erro(errors: dict) -> tuple[str, str]:
    field = next(iter(errors))
    return str(errors[field][0]), field


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all().order_by('nome_usuario')
    serializer_class = ClienteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {'error': mensagem, 'field': field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            cliente = serializer.save()
            dados = ClienteSerializer(cliente).data
            return Response(
                {'message': 'Cliente cadastrado com sucesso', 'cliente': dados},
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError:
            return Response(
                {'error': 'Email já cadastrado.', 'field': 'email'},
                status=status.HTTP_409_CONFLICT,
            )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {'error': mensagem, 'field': field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        cliente = serializer.save()
        return Response(ClienteSerializer(cliente).data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LocatarioViewSet(viewsets.ModelViewSet):
    queryset = Locatario.objects.all().order_by('nome_usuario')
    serializer_class = LocatarioSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {'error': mensagem, 'field': field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            locatario = serializer.save()
            dados = LocatarioSerializer(locatario).data
            return Response(
                {'message': 'Locatario criado com sucesso!', 'data': dados},
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError as e:
            campo = 'cpf' if 'cpf' in str(e).lower() else 'email'
            mensagem = 'CPF já cadastrado.' if campo == 'cpf' else 'Email já cadastrado.'
            return Response(
                {'error': mensagem, 'field': campo},
                status=status.HTTP_409_CONFLICT,
            )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        dados = LocatarioSerializer(instance).data
        return Response({'message': 'Locatario encontrado com sucesso!', 'data': dados})

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        dados = LocatarioSerializer(queryset, many=True).data
        return Response({'message': 'Lista de locatarios recuperada com sucesso!', 'data': dados})

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            mensagem, field = _primeiro_erro(serializer.errors)
            return Response(
                {'error': mensagem, 'field': field},
                status=status.HTTP_400_BAD_REQUEST,
            )
        locatario = serializer.save()
        return Response({
            'message': 'Locatario atualizado com sucesso!',
            'data': LocatarioSerializer(locatario).data,
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {'message': 'Locatario removido com sucesso!', 'data': {'message': 'Locatario deletado com sucesso'}},
            status=status.HTTP_200_OK,
        )


@api_view(['POST'])
def login(request):
    nome_usuario = request.data.get('nome_usuario')
    senha = request.data.get('senha')

    if not nome_usuario or not senha:
        return Response(
            {'error': 'nome_usuario e senha são obrigatórios.', 'details': 'Preencha todos os campos.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        cliente = Cliente.objects.get(nome_usuario=nome_usuario, senha=senha)
        dados = ClienteSerializer(cliente).data
        resultado = {
            'token': _gerar_token(cliente.id, 'cliente'),
            'usuario': {**dados, 'tipo': 'cliente'},
            'message': 'Login realizado com sucesso! Bem-vindo(a)!',
        }
        return Response({'message': 'Login realizado com sucesso!', 'data': resultado})
    except Cliente.DoesNotExist:
        pass

    try:
        locatario = Locatario.objects.get(nome_usuario=nome_usuario, senha=senha)
        dados = LocatarioSerializer(locatario).data
        resultado = {
            'token': _gerar_token(locatario.id, 'locatario'),
            'usuario': {**dados, 'tipo': 'locatario'},
            'message': 'Login realizado com sucesso! Bem-vindo(a)!',
        }
        return Response({'message': 'Login realizado com sucesso!', 'data': resultado})
    except Locatario.DoesNotExist:
        pass

    return Response(
        {
            'error': 'Usuário ou senha inválidos. Por favor, verifique suas credenciais.',
            'details': 'Por favor, tente novamente mais tarde.',
        },
        status=status.HTTP_401_UNAUTHORIZED,
    )
