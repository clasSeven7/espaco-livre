from locatarios.api.viewsets import LocatarioViewSet
from rest_framework import routers

router_locatario = routers.DefaultRouter()
router_locatario.register(r"locatarios", LocatarioViewSet, basename="locatario")
