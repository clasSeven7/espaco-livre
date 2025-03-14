from django.test import TestCase
from .models import AuthLogin


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
