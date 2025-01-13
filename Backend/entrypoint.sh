#!/bin/bash

# Esperar que la base de datos esté disponible
python manage.py wait_for_db

# Aplicar migraciones
python manage.py migrate

# Iniciar servidor
python manage.py runserver 0.0.0.0:8000