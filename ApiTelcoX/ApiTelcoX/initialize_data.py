# initialize_data.py
import os
import django
from django.db import connections
from django.contrib.auth.models import User
from api.modelos.servicesmodel import Paquete, Servicio


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ApiTelcoX.settings")
django.setup()


def initialize_data():
    # Crear paquetes
    Paquete.objects.get_or_create(
        id=1,
        nombre="Paquete Básico",
        descripcion="Paquete inicial con 1GB y 100 minutos.",
        precio=5.00,
        datos=1024,
        minutos=100,
        duracion=30,
    )
    Paquete.objects.get_or_create(
        id=2,
        nombre="Paquete Estándar",
        descripcion="Paquete estandar con 5GB y 100 minutos.",
        precio=10.00,
        datos=5120,
        minutos=100,
        duracion=30,
    )
    Paquete.objects.get_or_create(
        id=3,
        nombre="Paquete Premium",
        descripcion="Paquete avanzado con 10GB y 500 minutos.",
        precio=15.00,
        datos=10240,
        minutos=500,
        duracion=30,
    )

    # Crear servicios
    Servicio.objects.get_or_create(
        id=1,
        nombre="Internet Básico",
        descripcion="Internet con velocidad de hasta 10Mbps.",
        tipo="INTERNET",
        unidadMedida="MB",
        precio=20.00,
        duracion=30,
    )
    Servicio.objects.get_or_create(
        id=2,
        nombre="Internet Fibra Óptica",
        descripcion="Internet con velocidad de hasta 700Mbps.",
        tipo="INTERNET",
        unidadMedida="MB",
        precio=60.00,
        duracion=30,
    )
    Servicio.objects.get_or_create(
        id=3,
        nombre="Televisión HD",
        descripcion="Servicio de TV con 50 canales HD.",
        tipo="TELEVISION",
        unidadMedida="DIAS",
        precio=15.00,
        duracion=30,
    )

    # Crear usuario de prueba
    if not User.objects.filter(username="test").exists():
        User.objects.create_user(
            username="test", password="Test123", email="test@example.com"
        )

    print("Datos iniciales cargados.")


if __name__ == "__main__":
    initialize_data()
