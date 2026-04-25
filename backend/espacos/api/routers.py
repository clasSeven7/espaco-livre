from espacos.api.viewsets import EspacoViewSet
from rest_framework import routers

router_espaco = routers.DefaultRouter()
router_espaco.register(r"espacos", EspacoViewSet, basename="espaco")
