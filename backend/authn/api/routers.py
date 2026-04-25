from authn.api.viewsets import AuthViewSet
from rest_framework import routers

router_auth = routers.DefaultRouter()
router_auth.register(r"auth", AuthViewSet, basename="auth")
