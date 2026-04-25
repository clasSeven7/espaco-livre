#!/bin/sh
set -e

wait_for_db() {
    echo "Aguardando banco de dados..."
    while ! nc -z db 5432; do
        sleep 1
    done
    echo "Banco de dados está disponível!"
}

wait_for_db

echo "Rodando migrations..."
python manage.py migrate --noinput

echo "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput || echo "collectstatic falhou (ignorando)"

echo "Criando superusuário (se não existir)..."
python create_superuser.py || echo "Superusuário já existe"

echo "Iniciando o servidor..."
exec "$@"