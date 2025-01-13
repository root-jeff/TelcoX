from rest_framework import serializers
from api.modelos.servicesmodel import (
    ConsumoPaquete,
    Paquete,
    Servicio,
    ConsumoServicio,
    SuscripcionPaquete,
    SuscripcionServicio,
)


class PaqueteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paquete
        fields = [
            "id",
            "nombre",
            "descripcion",
            "precio",
            "datos",
            "duracion",
            "minutos",
        ]


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = [
            "id",
            "nombre",
            "descripcion",
            "tipo",
            "unidadMedida",
            "precio",
            "duracion",
        ]


class SuscripcionPaqueteSerializer(serializers.ModelSerializer):
    paquete_detail = PaqueteSerializer(source="paquete", read_only=True)

    class Meta:
        model = SuscripcionPaquete
        fields = [
            "id",
            "usuario",
            "paquete",
            "estado",
            "inicioSuscripcion",
            "finSuscripcion",
        ]

    def validate(self, data):
        usuario = data["usuario"]
        paquete = data["paquete"]

        # Verificar si el usuario ya tiene una suscripción activa para el mismo paquete
        if SuscripcionPaquete.objects.filter(
            usuario=usuario, paquete=paquete, estado="ACTIVO"
        ).exists():
            raise serializers.ValidationError(
                "El usuario ya tiene una suscripción activa para este paquete."
            )

        return data


class SuscripcionServicioSerializer(serializers.ModelSerializer):
    servicio_detail = ServicioSerializer(source="servicio", read_only=True)

    class Meta:
        model = SuscripcionServicio
        fields = [
            "id",
            "usuario",
            "servicio",
            "estado",
            "inicioSuscripcion",
            "finSuscripcion",
        ]

    def validate(self, data):
        usuario = data["usuario"]
        servicio = data["servicio"]

        # Verificar si el usuario ya tiene una suscripción activa para el mismo servicio
        if SuscripcionServicio.objects.filter(
            usuario=usuario, servicio=servicio, estado="ACTIVO"
        ).exists():
            raise serializers.ValidationError(
                "El usuario ya tiene una suscripción activa para este servicio."
            )

        return data


class ConsumoPaqueteSerializer(serializers.ModelSerializer):
    paquete_detail = PaqueteSerializer(source="paquete", read_only=True)

    class Meta:
        model = ConsumoPaquete
        fields = [
            "id",
            "usuario",
            "paquete",
            "tipo_recurso",
            "cantidad_consumida",
            "fecha",
        ]


class ConsumoServicioSerializer(serializers.ModelSerializer):
    servicio_detail = ServicioSerializer(source="servicio", read_only=True)

    class Meta:
        model = ConsumoServicio
        fields = [
            "id",
            "usuario",
            "servicio",
            "cantidad_consumida",
            "fecha",
        ]


class PaqueteDropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paquete
        fields = ["id", "nombre"]


class ServicioDropSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ["id", "nombre"]
