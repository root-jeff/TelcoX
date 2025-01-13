#!/bin/sh

echo "Esperando a la base de datos..."
while ! nc -z database 3306; do
    sleep 1
done
echo "Base de datos lista"

# Aplica migraciones
python manage.py migrate

# Ejecuta el servidor
exec "$@"
