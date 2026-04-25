from django.db import models


class Espaco(models.Model):
    locatario = models.ForeignKey(
        "locatarios.Locatario",
        on_delete=models.CASCADE,
        related_name="espacos",
    )
    nome = models.CharField(max_length=200)
    descricao = models.TextField(blank=True, null=True)
    endereco = models.TextField()
    cidade = models.CharField(max_length=100)
    cep = models.CharField(max_length=8)
    capacidade = models.IntegerField()
    preco_por_hora = models.DecimalField(max_digits=10, decimal_places=2)
    disponivel = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "espacos"

    def __str__(self):
        return self.nome
