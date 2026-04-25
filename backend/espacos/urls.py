from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'clientes', views.ClienteViewSet)
router.register(r'locatarios', views.LocatarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login', views.login),
]
