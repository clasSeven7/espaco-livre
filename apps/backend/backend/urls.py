from django.contrib import admin
from django.urls import path, include
from auth_app.api.router import urlpatterns as auth_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(auth_urls)),
]
