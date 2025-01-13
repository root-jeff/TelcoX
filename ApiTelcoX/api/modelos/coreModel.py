from django.db import models


class CRUDEntity(models.Model):
    ESTATUS_CHOICES = [
        ("ACTIVO", "Activo"),
        ("INACTIVO", "Inactivo"),
    ]

    activo = models.BooleanField(default=True)
    usuario_registro = models.CharField(max_length=100, default="SYSTEM")
    fecha_registro = models.DateTimeField(auto_now_add=True)
    usuario_modificacion = models.CharField(max_length=100, null=True, blank=True)
    fecha_modificacion = models.DateTimeField(auto_now=True, null=True, blank=True)
    usuario_eliminacion = models.CharField(max_length=100, null=True, blank=True)
    fecha_eliminacion = models.DateTimeField(null=True, blank=True)
    ip_registro = models.CharField(max_length=100, null=True, blank=True)
    ip_modificacion = models.CharField(max_length=100, null=True, blank=True)
    ip_eliminacion = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        abstract = (
            True  # Indica que no se crea una tabla para esta clase, solo se hereda.
        )
