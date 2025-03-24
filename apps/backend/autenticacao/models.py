from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, validate_email
from django.db import models


class Cliente(AbstractUser):
    email = models.EmailField(
        max_length=254, unique=True, validators=[validate_email])
    telefone = models.CharField(max_length=15)
    idade = models.IntegerField(validators=[MinValueValidator(18)])
    endereco_residencial = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    cep = models.CharField(max_length=9)

    # Garantindo que o username seja único
    username = models.CharField(
        max_length=150,
        unique=True,
        help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
        error_messages={
            'unique': 'A user with that username already exists.',
        },
    )

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='cliente_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='cliente_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

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
        return self.username


class Alocador(AbstractUser):
    email = models.EmailField(
        max_length=254, unique=True, validators=[validate_email])
    telefone = models.CharField(max_length=15)
    idade = models.IntegerField(validators=[MinValueValidator(18)])
    endereco_residencial = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    cpf = models.CharField(max_length=14, unique=True)
    cep = models.CharField(max_length=9)
    aceitar_termos = models.BooleanField(default=False)

    # Garantindo que o username seja único
    username = models.CharField(
        max_length=150,
        unique=True,
        help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
        error_messages={
            'unique': 'A user with that username already exists.',
        },
    )

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='alocador_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='alocador_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username
