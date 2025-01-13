from django.db import models
from api.modelos.servicesmodel import Paquete, Servicio
from api.modelos.userModel import Usuario
from api.modelos.coreModel import CRUDEntity

# Create your models here.


class Saldo(CRUDEntity):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    saldo = models.DecimalField(max_digits=10, decimal_places=2)
    fechaActualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.usuario} - {self.saldo}"


class Factura(CRUDEntity):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fechaEmision = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estadoFactura = models.CharField(
        max_length=20,
        choices=[
            ("PAGADA", "Pagada"),
            ("PENDIENTE", "Pendiente"),
            ("VENCIDA", "Vencida"),
            ("ANULADA", "Anulada"),
        ],
        default="PENDIENTE",
    )

    def __str__(self):
        return f"{self.id} - {self.fecha}"


class FacturaDetalle(CRUDEntity):
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE)
    tipoFactura = models.CharField(
        max_length=20,
        choices=[
            ("SERVICIO", "Servicio"),
            ("PAQUETE", "Paquete"),
        ],
    )
    paquete = models.ForeignKey(
        Paquete, on_delete=models.CASCADE, blank=True, null=True
    )
    servicio = models.ForeignKey(
        Servicio, on_delete=models.CASCADE, blank=True, null=True
    )
    cantidadConsumida = models.DecimalField(max_digits=10, decimal_places=2)
    precioUnitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.factura.id} - {self.servicio.nombre}"
