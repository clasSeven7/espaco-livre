from django.core.validators import MinValueValidator, validate_email
from django.db import models


class AuthLogin(models.Model):
    nome_usuario = models.CharField(max_length=100)
    senha = models.CharField(max_length=100)
    salvar_senha = models.BooleanField(default=False)

    def __str__(self):
        return self.nome_usuario


class AuthCliente(models.Model):
    nome_usuario = models.CharField(max_length=100)
    senha = models.CharField(max_length=128)
    email = models.EmailField(
        max_length=254, unique=True, validators=[validate_email])
    telefone = models.CharField(max_length=15)
    idade = models.IntegerField(validators=[MinValueValidator(18)])
    endereco_residencial = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    cep = models.CharField(max_length=9)

    ocupacao_choices = [
        ('startup', 'Startup'),
        ('influencer', 'Influencer'),
        ('produtor', 'Produtor'),
        ('gerente', 'Gerente'),
        ('freelancer', 'Freelancer'),
        ('fotografo', 'Fotógrafo'),
    ]
    tipo_ocupacao = models.CharField(
        max_length=50,
        choices=ocupacao_choices,
        blank=True,
    )

    frequencia_choices = [
        ('ocasional', 'Ocasional'),
        ('semanal', 'Semanal'),
        ('diario', 'Diário'),
        ('mensal', 'Mensal'),
    ]
    frequencia_uso = models.CharField(
        max_length=50,
        choices=frequencia_choices,
        blank=True,
    )

    def __str__(self):
        return self.nome_usuario


class AuthAlocador(models.Model):
    nome_usuario = models.CharField(max_length=100)
    senha = models.CharField(max_length=128)
    email = models.EmailField(
        max_length=254, unique=True, validators=[validate_email])
    telefone = models.CharField(max_length=15)
    idade = models.IntegerField(validators=[MinValueValidator(18)])
    endereco_residencial = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    cep = models.CharField(max_length=9)
    aceitar_termos = models.BooleanField(default=False)

    def __str__(self):
        return self.nome_usuario
