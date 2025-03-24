from autenticacao.api import viewsets
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'cliente', viewsets.ClienteViewSet)
router.register(r'alocador', viewsets.AlocadorViewSet)

urlpatterns = router.urls
