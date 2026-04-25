# swagger.py
from drf_yasg import openapi
from drf_yasg.inspectors import SwaggerAutoSchema
from drf_yasg.views import get_schema_view
from rest_framework import permissions


class ViewsetSwaggerAutoSchema(SwaggerAutoSchema):
    def get_tags(self, operation_keys=None):
        view = getattr(self, "view", None)
        if view is not None:
            swagger_tags = getattr(view, "swagger_tags", None)
            if swagger_tags:
                return swagger_tags
        return super().get_tags(operation_keys)


swagger = get_schema_view(
    openapi.Info(
        title="SADA API",
        default_version="v1",
        description="Documentação da API do SADA — separada por grupos (Accounts, Chats etc.)",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
