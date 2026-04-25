from authn.api.serializers import LoginSerializer, SignupSerializer
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    swagger_tags = ["auth"]

    @action(detail=False, methods=["post"], url_path="login")
    def login_view(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.validated_data["username"],
            password=serializer.validated_data["password"],
        )

        if user is None:
            return Response(
                {"error": "Usuário ou senha incorretos"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "Login realizado com sucesso",
                "token": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
            }
        )

    @action(detail=False, methods=["post"], url_path="logout")
    def logout_view(self, request):
        logout(request)
        return Response({"message": "Logout realizado com sucesso"})

    @action(detail=False, methods=["post"], url_path="signup")
    def signup_view(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "message": "Usuário criado com sucesso",
                "token": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED,
        )
