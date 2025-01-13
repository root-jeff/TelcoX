from rest_framework import serializers
from api.modelos.billingModel import Factura, Saldo, FacturaDetalle

from api.serializers.servicesSerializer import PaqueteSerializer, ServicioSerializer


class SaldoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saldo
        fields = ["id", "usuario", "saldo_disponible", "fecha_actualizacion"]


class FacturaDetalleSerializer(serializers.ModelSerializer):
    paquete_detail = PaqueteSerializer(source="paquete", read_only=True)
    servicio_detail = ServicioSerializer(source="servicio", read_only=True)

    class Meta:
        model = FacturaDetalle
        fields = [
            "id",
            "factura",
            "tipo_facturacion",
            "paquete",
            "paquete_detail",
            "servicio",
            "servicio_detail",
            "cantidad_consumida",
            "precio_unitario",
            "subtotal",
        ]


class FacturaSerializer(serializers.ModelSerializer):
    detalles = FacturaDetalleSerializer(
        many=True, read_only=True, source="facturadetalle_set"
    )

    class Meta:
        model = Factura
        fields = [
            "id",
            "usuario",
            "fecha_emision",
            "total",
            "estado_factura",
            "detalles",
        ]


class FacturaDetalladaSerializer(serializers.ModelSerializer):
    from api.serializers.userSerializer import UsuarioSerializer

    detalles = FacturaDetalleSerializer(
        many=True, read_only=True, source="facturadetalle_set"
    )
    usuario_detail = UsuarioSerializer(source="usuario", read_only=True)

    class Meta:
        model = Factura
        fields = [
            "id",
            "usuario",
            "usuario_detail",
            "fecha_emision",
            "total",
            "estado_factura",
            "detalles",
        ]
