from clientes.api.viewsets import ClienteViewSet
from rest_framework import routers

router_cliente = routers.DefaultRouter()
router_cliente.register(r"clientes", ClienteViewSet, basename="cliente")
