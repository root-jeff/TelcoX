from rest_framework import generics
from api.modelos.servicesmodel import Paquete
from rest_framework.response import Response
from api.serializers.servicesSerializer import (
    PaqueteSerializer,
    PaqueteDropSerializer,
    ConsumoPaquete,
    ConsumoPaqueteSerializer,
    SuscripcionPaquete,
    SuscripcionPaqueteSerializer,
)


class PaqueteListCreateView(generics.ListCreateAPIView):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteSerializer


class PaqueteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteSerializer


class PaqueteDropListView(generics.ListAPIView):
    queryset = Paquete.objects.all()
    serializer_class = PaqueteDropSerializer


class UsuarioPaquetesActivosView(generics.ListAPIView):
    """
    Vista para verificar si un usuario tiene paquetes activos y vacíos a través de la FK.
    """

    serializer_class = PaqueteSerializer

    def get_queryset(self):
        """
        Filtra paquetes que están activos y vacíos para un usuario específico usando la FK.
        """
        usuario_id = self.kwargs.get(
            "usuario_id"
        )  # Obtener el ID del usuario desde la URL
        if not usuario_id:
            return (
                Paquete.objects.none()
            )  # Retorna un queryset vacío si no se pasa usuario_id

        # Filtrar por el usuario_id y por los estados activo y vacio
        return Paquete.objects.filter(usuario_id=usuario_id, activo=True, vacio=True)

    def list(self, request, *args, **kwargs):
        """
        Devuelve los detalles de los paquetes activos y vacíos del usuario.
        """
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response(
                {"message": "El usuario no tiene paquetes activos y vacíos."},
                status=200,
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=200)


class ConsumoPaqueteListCreateView(generics.ListCreateAPIView):
    queryset = ConsumoPaquete.objects.all()
    serializer_class = ConsumoPaqueteSerializer


class ConsumoPaqueteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConsumoPaquete.objects.all()
    serializer_class = ConsumoPaqueteSerializer


class SuscripcionPaqueteListCreateView(generics.ListCreateAPIView):
    queryset = SuscripcionPaquete.objects.all()
    serializer_class = SuscripcionPaqueteSerializer


class SuscripcionPaqueteRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = SuscripcionPaquete.objects.all()
    serializer_class = SuscripcionPaqueteSerializer
