from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError, transaction
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Alocador, Cliente


def validate_password(password):
    if len(password) < 6:
        raise ValueError("A senha deve ter pelo menos 6 caracteres")
    return make_password(password)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    try:
        data = request.data
        username = data.get('nome_usuario')
        password = data.get('senha')

        if not username or not password:
            return Response({
                'message': 'Nome de usuário e senha são obrigatórios'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Tenta autenticar como cliente
        cliente = Cliente.objects.filter(username=username).first()
        if cliente and cliente.check_password(password):
            refresh = RefreshToken.for_user(cliente)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': cliente.id,
                    'nome_usuario': cliente.username,
                    'tipo': 'cliente'
                }
            })

        # Tenta autenticar como alocador
        alocador = Alocador.objects.filter(username=username).first()
        if alocador and alocador.check_password(password):
            refresh = RefreshToken.for_user(alocador)
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'id': alocador.id,
                    'nome_usuario': alocador.username,
                    'tipo': 'alocador'
                }
            })

        return Response({
            'message': 'Credenciais inválidas. Verifique seu nome de usuário e senha.'
        }, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({
            'message': 'Erro interno do servidor. Por favor, tente novamente.',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def cadastro_cliente(request):
    try:
        data = request.data

        # Validação dos campos obrigatórios
        required_fields = ['email', 'senha', 'nome_usuario', 'telefone', 'idade',
                           'endereco_residencial', 'cidade', 'cep', 'tipo_ocupacao',
                           'frequencia_uso']

        for field in required_fields:
            if not data.get(field):
                return Response({
                    'message': f'O campo {field} é obrigatório',
                    'field': field
                }, status=status.HTTP_400_BAD_REQUEST)

        # Validação da senha
        senha_hash = validate_password(data['senha'])

        with transaction.atomic():
            cliente = Cliente.objects.create(
                username=data['nome_usuario'],
                email=data['email'],
                password=senha_hash,
                telefone=data['telefone'],
                idade=data['idade'],
                endereco_residencial=data['endereco_residencial'],
                cidade=data['cidade'],
                cep=data['cep'],
                tipo_ocupacao=data['tipo_ocupacao'],
                frequencia_uso=data['frequencia_uso']
            )

        return Response({
            'message': 'Cliente cadastrado com sucesso',
            'id': cliente.id,
            'redirect': '/login'
        }, status=status.HTTP_201_CREATED)

    except IntegrityError:
        return Response({
            'message': 'Email já cadastrado',
            'field': 'email'
        }, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({
            'message': str(e),
            'field': 'senha'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'message': 'Erro interno do servidor. Por favor, tente novamente.',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def cadastro_alocador(request):
    try:
        data = request.data

        # Validação dos campos obrigatórios
        required_fields = ['email', 'senha', 'nome_usuario', 'telefone', 'idade',
                           'endereco_residencial', 'cidade', 'cpf', 'cep', 'aceitar_termos']

        for field in required_fields:
            if not data.get(field):
                return Response({
                    'message': f'O campo {field} é obrigatório',
                    'field': field
                }, status=status.HTTP_400_BAD_REQUEST)

        if not data['aceitar_termos']:
            return Response({
                'message': 'É necessário aceitar os termos de uso',
                'field': 'aceitar_termos'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validação da senha
        senha_hash = validate_password(data['senha'])

        with transaction.atomic():
            alocador = Alocador.objects.create(
                username=data['nome_usuario'],
                email=data['email'],
                password=senha_hash,
                telefone=data['telefone'],
                idade=data['idade'],
                endereco_residencial=data['endereco_residencial'],
                cidade=data['cidade'],
                cpf=data['cpf'],
                cep=data['cep'],
                aceitar_termos=data['aceitar_termos']
            )

        return Response({
            'message': 'Alocador cadastrado com sucesso',
            'id': alocador.id,
            'redirect': '/login'
        }, status=status.HTTP_201_CREATED)

    except IntegrityError as e:
        if 'email' in str(e):
            field = 'email'
            message = 'Email já cadastrado'
        elif 'cpf' in str(e):
            field = 'cpf'
            message = 'CPF já cadastrado'
        else:
            field = None
            message = 'Erro de integridade no cadastro'

        return Response({
            'message': message,
            'field': field
        }, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({
            'message': str(e),
            'field': 'senha'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'message': 'Erro interno do servidor. Por favor, tente novamente.',
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
