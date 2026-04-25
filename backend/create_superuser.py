#!/usr/bin/env python
import os

import django
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "setup.settings")
django.setup()


def create_superuser():
    user_model = get_user_model()

    username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")
    email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@admin.com")
    password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "admin")

    if not user_model.objects.filter(username=username).exists():
        user_model.objects.create_superuser(
            username,
            email,
            password
        )
        print(f"Superuser '{username}' created successfully.")
    else:
        print(f"Superuser '{username}' already exists.")


if __name__ == "__main__":
    create_superuser()
