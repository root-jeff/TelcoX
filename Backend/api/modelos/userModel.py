from django.contrib.auth.models import AbstractUser
from django.db import models
from api.modelos.coreModel import CRUDEntity
from django.core.validators import RegexValidator


class Usuario(AbstractUser, CRUDEntity):
    cedula = models.CharField(
        max_length=10,
        unique=True,
        validators=[
            RegexValidator(
                regex=r"^\d{10}$", message="Cédula debe tener 10 dígitos numéricos"
            )
        ],
    )

    telefono = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r"^\+?1?\d{9,15}$", message="Formato de teléfono inválido"
            )
        ],
    )

    direccion = models.TextField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    # Groups relationship
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="usuarios_custom",
        blank=True,
        help_text="Los grupos a los que pertenece este usuario.",
    )

    # Permissions relationship
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="usuarios_custom",
        blank=True,
        help_text="Permisos específicos para este usuario.",
    )

    class Meta:
        ordering = ["-fecha_registro"]
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return f"{self.username} - {self.cedula}"
