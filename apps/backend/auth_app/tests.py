from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import AuthLogin, AuthCliente, AuthAlocador


class AuthLoginTest(TestCase):
    def setUp(self):
        # Configuração inicial para cada teste
        self.auth_login = AuthLogin.objects.create(
            email="teste@exemplo.com",
            senha="senha123",
            salvar_senha=True
        )

    def test_criacao_auth_login(self):
        # Testa se o objeto foi criado corretamente
        self.assertEqual(self.auth_login.email, "teste@exemplo.com")
        self.assertEqual(self.auth_login.senha, "senha123")
        self.assertTrue(self.auth_login.salvar_senha)

    def test_str_representation(self):
        # Testa se o método __str__ retorna o email corretamente
        self.assertEqual(str(self.auth_login), "teste@exemplo.com")

    def test_campos_max_length(self):
        # Testa os limites máximos dos campos
        auth_login = AuthLogin.objects.get(id=self.auth_login.id)
        max_length_email = auth_login._meta.get_field('email').max_length
        max_length_senha = auth_login._meta.get_field('senha').max_length

        self.assertEqual(max_length_email, 254)
        self.assertEqual(max_length_senha, 100)

    def test_valor_padrao_salvar_senha(self):
        # Testa o valor padrão do campo salvar_senha
        novo_login = AuthLogin.objects.create(
            email="novo@exemplo.com",
            senha="novasenha123"
        )
        self.assertFalse(novo_login.salvar_senha)


class CadastroClienteTest(APITestCase):
    def setUp(self):
        self.url = reverse('cadastro-cliente')
        self.dados_validos = {
            'email': 'teste@email.com',
            'senha': 'senha123',
            'nome_usuario': 'Teste Usuario',
            'telefone': '11999999999',
            'idade': 25,
            'endereco_residencial': 'Rua Teste, 123',
            'cidade': 'São Paulo',
            'cep': '01234-567',
            'tipo_ocupacao': 'startup',
            'frequencia_uso': 'semanal'
        }

    def test_cadastro_cliente_campos_obrigatorios(self):
        """Testa o cadastro de cliente com todos os campos obrigatórios"""
        response = self.client.post(self.url, self.dados_validos)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AuthCliente.objects.count(), 1)
        cliente = AuthCliente.objects.first()
        self.assertEqual(cliente.email, self.dados_validos['email'])
        self.assertEqual(cliente.nome_usuario, self.dados_validos['nome_usuario'])

    def test_cadastro_cliente_campos_opcionais(self):
        """Testa o cadastro de cliente sem os campos opcionais"""
        dados_minimos = {
            'email': 'teste@email.com',
            'senha': 'senha123',
            'nome_usuario': 'Teste Usuario',
            'telefone': '11999999999',
            'idade': 25,
            'endereco_residencial': 'Rua Teste, 123',
            'cidade': 'São Paulo',
            'cep': '01234-567'
        }
        response = self.client.post(self.url, dados_minimos)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AuthCliente.objects.count(), 1)

    def test_cadastro_cliente_email_invalido(self):
        """Testa o cadastro de cliente com email inválido"""
        dados_invalidos = self.dados_validos.copy()
        dados_invalidos['email'] = 'email_invalido'
        response = self.client.post(self.url, dados_invalidos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cadastro_cliente_email_duplicado(self):
        """Testa o cadastro de cliente com email já existente"""
        # Primeiro cadastro
        self.client.post(self.url, self.dados_validos)
        # Tentativa de cadastro com mesmo email
        response = self.client.post(self.url, self.dados_validos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(AuthCliente.objects.count(), 1)

    def test_cadastro_cliente_tipo_ocupacao_invalido(self):
        """Testa o cadastro de cliente com tipo de ocupação inválido"""
        dados_invalidos = self.dados_validos.copy()
        dados_invalidos['tipo_ocupacao'] = 'ocupacao_invalida'
        response = self.client.post(self.url, dados_invalidos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cadastro_cliente_frequencia_uso_invalida(self):
        """Testa o cadastro de cliente com frequência de uso inválida"""
        dados_invalidos = self.dados_validos.copy()
        dados_invalidos['frequencia_uso'] = 'frequencia_invalida'
        response = self.client.post(self.url, dados_invalidos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class CadastroAlocadorTest(APITestCase):
    def setUp(self):
        self.url = reverse('cadastro-alocador')
        self.dados_validos = {
            'email': 'alocador@email.com',
            'senha': 'senha123',
            'nome_usuario': 'Alocador Teste',
            'telefone': '11999999999',
            'idade': 30,
            'endereco_residencial': 'Rua Teste, 123',
            'cidade': 'São Paulo',
            'cpf': '123.456.789-00',
            'aceitar_termos': True,
            'cep': '01234-567'
        }

    def test_cadastro_alocador_campos_obrigatorios(self):
        """Testa o cadastro de alocador com todos os campos obrigatórios"""
        response = self.client.post(self.url, self.dados_validos)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AuthAlocador.objects.count(), 1)
        alocador = AuthAlocador.objects.first()
        self.assertEqual(alocador.email, self.dados_validos['email'])
        self.assertEqual(alocador.nome_usuario, self.dados_validos['nome_usuario'])

    def test_cadastro_alocador_sem_aceitar_termos(self):
        """Testa o cadastro de alocador sem aceitar os termos"""
        dados_invalidos = self.dados_validos.copy()
        dados_invalidos['aceitar_termos'] = False
        response = self.client.post(self.url, dados_invalidos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(AuthAlocador.objects.count(), 0)

    def test_cadastro_alocador_email_invalido(self):
        """Testa o cadastro de alocador com email inválido"""
        dados_invalidos = self.dados_validos.copy()
        dados_invalidos['email'] = 'email_invalido'
        response = self.client.post(self.url, dados_invalidos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cadastro_alocador_email_duplicado(self):
        """Testa o cadastro de alocador com email já existente"""
        # Primeiro cadastro
        self.client.post(self.url, self.dados_validos)
        # Tentativa de cadastro com mesmo email
        response = self.client.post(self.url, self.dados_validos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(AuthAlocador.objects.count(), 1)

    def test_cadastro_alocador_cpf_invalido(self):
        """Testa o cadastro de alocador com CPF inválido"""
        dados_invalidos = self.dados_validos.copy()
        dados_invalidos['cpf'] = '123.456.789'
        response = self.client.post(self.url, dados_invalidos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_cadastro_alocador_cpf_duplicado(self):
        """Testa o cadastro de alocador com CPF já existente"""
        # Primeiro cadastro
        self.client.post(self.url, self.dados_validos)
        # Tentativa de cadastro com mesmo CPF
        dados_duplicados = self.dados_validos.copy()
        dados_duplicados['email'] = 'outro@email.com'
        response = self.client.post(self.url, dados_duplicados)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(AuthAlocador.objects.count(), 1)
