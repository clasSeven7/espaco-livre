from django.urls import path

from . import views

urlpatterns = [
    path('cadastro/cliente/', views.cadastro_cliente, name='cadastro-cliente'),
    path('cadastro/alocador/', views.cadastro_alocador, name='cadastro-alocador'),
    path('login/', views.login, name='login'),
]
