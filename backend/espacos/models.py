from django.db import models


class Cliente(models.Model):
    TIPO_OCUPACAO_CHOICES = [
        ('startup', 'Startup'),
        ('influencer', 'Influencer'),
        ('produtor', 'Produtor'),
        ('gerente', 'Gerente'),
        ('freelancer', 'Freelancer'),
        ('fotografo', 'Fotógrafo'),
    ]

    FREQUENCIA_USO_CHOICES = [
        ('ocasional', 'Ocasional'),
        ('semanal', 'Semanal'),
        ('diario', 'Diário'),
        ('mensal', 'Mensal'),
    ]

    nome_usuario = models.CharField(max_length=100)
    senha = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    idade = models.IntegerField()
    endereco_residencial = models.TextField(blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    cep = models.CharField(max_length=8, blank=True, null=True)
    tipo_ocupacao = models.CharField(max_length=50, choices=TIPO_OCUPACAO_CHOICES, blank=True, null=True)
    frequencia_uso = models.CharField(max_length=50, choices=FREQUENCIA_USO_CHOICES, blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'clientes'

    def __str__(self):
        return self.nome_usuario


class Locatario(models.Model):
    nome_usuario = models.CharField(max_length=100)
    senha = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    idade = models.IntegerField(blank=True, null=True)
    endereco_residencial = models.TextField(blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    cpf = models.CharField(max_length=11, unique=True)
    cep = models.CharField(max_length=8, blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'locatarios'

    def __str__(self):
        return self.nome_usuario
