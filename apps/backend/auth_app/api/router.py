from rest_framework import routers
from auth_app.api import viewsets
from .viewsets import AuthClienteViewSet, AuthAlocadorViewSet

router = routers.DefaultRouter()
router.register(r'login', viewsets.AuthLoginViewSet)
router.register(r'cliente', viewsets.AuthClienteViewSet)
router.register(r'alocador', viewsets.AuthAlocadorViewSet)
router.register(r'auth/cadastro/cliente', AuthClienteViewSet, basename='cadastro-cliente')
router.register(r'auth/cadastro/alocador', AuthAlocadorViewSet, basename='cadastro-alocador')

urlpatterns = router.urls

