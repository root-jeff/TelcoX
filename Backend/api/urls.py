from django.urls import path
from rest_framework.routers import DefaultRouter
from .vistas.authView import RegisterView, LogOutView, LoginView
from .vistas.UserListView import UsuarioList, UsuarioActions
from .vistas.paquetesView import (
    PaqueteListCreateView,
    PaqueteRetrieveUpdateDestroyView,
    PaqueteDropListView,
    UsuarioPaquetesActivosView,
    ConsumoPaqueteListCreateView,
    ConsumoPaqueteRetrieveUpdateDestroyView,
    SuscripcionPaqueteListCreateView,
    SuscripcionPaqueteRetrieveUpdateDestroyView,
)
from .vistas.serviciosView import (
    ServicioListCreateView,
    ServicioRetrieveUpdateDestroyView,
    ServicioDropListView,
    SuscripcionServicioListCreateView,
    SuscripcionServicioRetrieveUpdateDestroyView,
    ConsumoServicioListCreateView,
    ConsumoServicioRetrieveUpdateDestroyView,
)


router = DefaultRouter()

urlpatterns = [
    # Apartado de autenticación
    path(
        "api/auth/login/",
        LoginView.as_view(),
        name="login",
    ),
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/logout/", LogOutView.as_view(), name="logout"),
    # Apartado de usuarios
    path("api/users/", UsuarioList.as_view(), name="users"),
    path("api/profile/<int:id>/", UsuarioActions.as_view(), name="profile"),
    # Apartado de paquetes
    path("api/paquetes/", PaqueteListCreateView.as_view(), name="paquetes"),
    path(
        "api/paquetes/<int:pk>/",
        PaqueteRetrieveUpdateDestroyView.as_view(),
        name="paquete",
    ),
    path(
        "api/paquetes/drop/",
        PaqueteDropListView.as_view(),
        name="paquete-drop-list",
    ),
    path(
        "api/paquetes/activos/<int:usuario_id>/",
        UsuarioPaquetesActivosView.as_view(),
        name="paquete-activos",
    ),
    # SuscripcionPaquete URLs
    path(
        "suscripciones/paquetes/",
        SuscripcionPaqueteListCreateView.as_view(),
        name="suscripcion-paquete-list-create",
    ),
    path(
        "suscripciones/paquetes/<int:pk>/",
        SuscripcionPaqueteRetrieveUpdateDestroyView.as_view(),
        name="suscripcion-paquete-detail",
    ),
    # ConsumoPaquete URLs
    path(
        "consumos/paquetes/",
        ConsumoPaqueteListCreateView.as_view(),
        name="consumo-paquete-list-create",
    ),
    path(
        "consumos/paquetes/<int:pk>/",
        ConsumoPaqueteRetrieveUpdateDestroyView.as_view(),
        name="consumo-paquete-detail",
    ),
    # Apartado de servicios
    path(
        "api/servicios/",
        ServicioListCreateView.as_view(),
        name="servicios",
    ),
    path(
        "api/servicios/<int:pk>/",
        ServicioRetrieveUpdateDestroyView.as_view(),
        name="servicio",
    ),
    path(
        "api/servicios/drop/",
        ServicioDropListView.as_view(),
        name="servicio-drop-list",
    ),
    # SuscripcionServicio URLs
    path(
        "suscripciones/servicios/",
        SuscripcionServicioListCreateView.as_view(),
        name="suscripcion-servicio-list-create",
    ),
    path(
        "suscripciones/servicios/<int:pk>/",
        SuscripcionServicioRetrieveUpdateDestroyView.as_view(),
        name="suscripcion-servicio-detail",
    ),
    # ConsumoServicio URLs
    path(
        "consumos/servicios/",
        ConsumoServicioListCreateView.as_view(),
        name="consumo-servicio-list-create",
    ),
    path(
        "consumos/servicios/<int:pk>/",
        ConsumoServicioRetrieveUpdateDestroyView.as_view(),
        name="consumo-servicio-detail",
    ),
]

urlpatterns += router.urls
