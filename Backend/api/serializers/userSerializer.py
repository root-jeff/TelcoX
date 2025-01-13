from api.modelos.userModel import Usuario
from rest_framework import serializers


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "cedula",
            "telefono",
            "password",
            "is_active",
            "fecha_registro",
        ]
        read_only_fields = ["fecha_registro"]
        extra_kwargs = {"password": {"write_only": True}}


class UsuarioDetalladoSerializer(serializers.ModelSerializer):
    from api.serializers.billingSerializer import FacturaSerializer, SaldoSerializer
    from api.serializers.servicesSerializer import (
        SuscripcionPaqueteSerializer,
        SuscripcionServicioSerializer,
    )

    suscripciones_paquetes = SuscripcionPaqueteSerializer(
        many=True, read_only=True, source="suscripcionpaquete_set"
    )
    suscripciones_servicios = SuscripcionServicioSerializer(
        many=True, read_only=True, source="suscripcionservicio_set"
    )
    saldo = SaldoSerializer(read_only=True)
    facturas = FacturaSerializer(many=True, read_only=True, source="factura_set")

    class Meta:
        model = Usuario
        fields = [
            "id",
            "email",
            "cedula",
            "direccion",
            "telefono",
            "fecha_registro",
            "suscripciones_paquetes",
            "suscripciones_servicios",
            "saldo",
            "facturas",
        ]
        read_only_fields = ["fecha_registro"]
