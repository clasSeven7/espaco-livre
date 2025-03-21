from auth_app.api import viewsets
from rest_framework import routers

from .viewsets import AuthAlocadorViewSet, AuthClienteViewSet

router = routers.DefaultRouter()
router.register(r'login', viewsets.AuthLoginViewSet)
router.register(r'cliente', viewsets.AuthClienteViewSet)
router.register(r'alocador', viewsets.AuthAlocadorViewSet)

urlpatterns = router.urls
