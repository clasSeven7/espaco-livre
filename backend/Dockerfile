# ---------- BASE ----------
FROM python:3.12-slim-bookworm AS base

WORKDIR /app

RUN apt-get update \
    && apt-get install -y build-essential libpq-dev netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8001

ENTRYPOINT ["entrypoint.sh"]


# ---------- DEVELOPMENT STAGE ----------
FROM base AS development

# ENV ENV DJANGO_SETTINGS_MODULE=setup.settings.development

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8001"]


# ---------- PRODUCTION STAGE ----------
FROM base AS production

# ENV DJANGO_SETTINGS_MODULE=setup.settings.production

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# CMD ["gunicorn", "setup.wsgi:application", "--bind", "0.0.0.0:8001", "--timeout", "300"]
CMD ["daphne", "-b", "0.0.0.0", "-p", "8001", "setup.asgi:application"]
