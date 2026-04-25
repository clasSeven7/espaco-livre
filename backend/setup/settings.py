from datetime import timedelta
from pathlib import Path

from decouple import Csv, config
from dj_database_url import config as db_url

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("APP_SECRET_KEY")
DEBUG = config("APP_DEBUG", cast=bool, default=False)

ALLOWED_HOSTS = config("APP_ALLOWED_HOSTS", cast=Csv())
CSRF_TRUSTED_ORIGINS = config("APP_CSRF_TRUSTED_ORIGINS", cast=Csv())

# ------------ CORS CONFIG ------------
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", cast=Csv())
CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
]

# ----------- INSTALLED_APPS -------------
DJANGO_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "channels",
    "drf_yasg",
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
]

MY_APPS = [
    "authn.apps.AuthnConfig",
    "clientes.apps.ClientesConfig",
    "locatarios.apps.LocatariosConfig",
    "espacos.apps.EspacosConfig",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + MY_APPS

# ----------- MIDDLEWARE -------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "setup.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "setup.wsgi.application"
ASGI_APPLICATION = "setup.asgi.application"

# ----------- CHANNELS -------------
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    }
}

# ----------- DATABASE -------------
DATABASES = {
    "default": db_url(
        default=config("APP_DATABASE_URL"),
    )
}

# ----------- INTERNATIONALIZATION -------------
LANGUAGE_CODE = config("APP_LANGUAGE_CODE")
TIME_ZONE = config("APP_TIMEZONE")

# ----------- STATIC -------------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ----------- REST FRAMEWORK -------------

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    # "DEFAULT_PERMISSION_CLASSES": [
    #     "rest_framework.permissions.IsAuthenticated",
    # ],
}

# ----------- SIMPLE JWT CONFIG -------------
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# ----------- SWAGGER -------------
SWAGGER_SETTINGS = {
    "DEFAULT_AUTO_SCHEMA_CLASS": "setup.swagger.ViewsetSwaggerAutoSchema",
}

# ------------ LOGGING ------------
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "[{levelname}] {asctime} ({name}) - {message}",
            "style": "{",
        },
        "simple": {"format": "[{levelname}] {message}", "style": "{"},
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {"handlers": ["console"], "level": "INFO"},
        "authn": {"handlers": ["console"], "level": "DEBUG", "propagate": False},
        "clientes": {"handlers": ["console"], "level": "DEBUG", "propagate": False},
        "espacos": {"handlers": ["console"], "level": "DEBUG", "propagate": False},
    },
}
