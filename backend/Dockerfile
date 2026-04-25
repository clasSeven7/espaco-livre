# ---------- BASE ----------
FROM python:3.13-slim-bookworm AS base

WORKDIR /app

RUN apt-get update \
    && apt-get install -y build-essential libpq-dev netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8002

ENTRYPOINT ["entrypoint.sh"]


# ---------- DEVELOPMENT ----------
FROM base AS development

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8002"]


# ---------- PRODUCTION ----------
FROM base AS production

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["daphne", "-b", "0.0.0.0", "-p", "8002", "setup.asgi:application"]
