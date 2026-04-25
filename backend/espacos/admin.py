from django.contrib import admin
from .models import Cliente, Locatario


@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome_usuario', 'email', 'cidade', 'tipo_ocupacao', 'frequencia_uso', 'criado_em')
    search_fields = ('nome_usuario', 'email', 'cidade')
    list_filter = ('tipo_ocupacao', 'frequencia_uso')
    readonly_fields = ('criado_em', 'atualizado_em')


@admin.register(Locatario)
class LocatarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome_usuario', 'email', 'cpf', 'cidade', 'criado_em')
    search_fields = ('nome_usuario', 'email', 'cpf', 'cidade')
    readonly_fields = ('criado_em', 'atualizado_em')
