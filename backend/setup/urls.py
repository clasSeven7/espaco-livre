from authn.api.routers import router_auth
from clientes.api.routers import router_cliente
from django.contrib import admin
from django.urls import include, path
from espacos.api.routers import router_espaco
from locatarios.api.routers import router_locatario
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .swagger import swagger

route = routers.DefaultRouter()
route.registry.extend(router_auth.registry)
route.registry.extend(router_cliente.registry)
route.registry.extend(router_locatario.registry)
route.registry.extend(router_espaco.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("api/", include(route.urls)),
    path("swagger/", swagger.with_ui("swagger", cache_timeout=0), name="swagger-ui"),
]
