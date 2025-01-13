from django.db import models
from django.core.validators import MinValueValidator
from api.modelos.userModel import Usuario
from api.modelos.coreModel import CRUDEntity
from decimal import Decimal


# Create your models here.
class Paquete(CRUDEntity):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))]
    )
    datos = models.IntegerField()  # en MB
    minutos = models.IntegerField()
    duracion = models.IntegerField()  # en días

    def __str__(self):
        return self.nombre


class Servicio(CRUDEntity):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(
        max_length=50,
        choices=[
            ("MOVIL", "Móvil"),
            ("FIJO", "Fijo"),
            ("INTERNET", "Internet"),
            ("TELEVISION", "Televisión"),
        ],
    )
    unidadMedida = models.CharField(
        max_length=50,
        choices=[
            ("DIAS", "Días"),
            ("MINUTOS", "Minutos"),
            ("SMS", "SMS"),
            ("MB", "MB"),
            ("GB", "GB"),
        ],
    )
    precio = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.00"))]
    )
    duracion = models.IntegerField()  # en días

    def __str__(self):
        return self.nombre


class SuscripcionPaquete(CRUDEntity):
    paquete = models.ForeignKey(Paquete, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    estado = models.CharField(
        max_length=30,
        choices=[
            ("ACTIVO", "Activo"),
            ("INACTIVO", "Inactivo"),
            ("CANCELADO", "Cancelado"),
        ],
        default="ACTIVO",
    )
    inicioSuscripcion = models.DateField()
    finSuscripcion = models.DateField()

    def __str__(self):
        return f"{self.paquete.nombre} - {self.usuario.email}"


class SuscripcionServicio(CRUDEntity):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    estado = models.CharField(
        max_length=30,
        choices=[
            ("ACTIVO", "Activo"),
            ("INACTIVO", "Inactivo"),
            ("CANCELADO", "Cancelado"),
        ],
        default="ACTIVO",
    )
    inicioSuscripcion = models.DateField()
    finSuscriopcion = models.DateField()

    def __str__(self):
        return f"{self.servicio.nombre} - {self.usuario.email}"


class ConsumoPaquete(CRUDEntity):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    paquete = models.ForeignKey(Paquete, on_delete=models.CASCADE)
    tipo_recurso = models.CharField(
        max_length=20,
        choices=[("DATOS", "Consumo de Datos"), ("MINUTOS", "Consumo de Minutos")],
    )
    cantidad_consumida = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.cantidad_consumida} -{self.usuario.email}"


class ConsumoServicio(CRUDEntity):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)
    cantidad_consumida = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.cantidad_consumida} -{self.usuario.email}"
