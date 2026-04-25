from django.db import models


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
        db_table = "locatarios"

    def __str__(self):
        return self.nome_usuario
