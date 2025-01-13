from rest_framework import generics
from api.modelos.servicesmodel import Servicio
from api.serializers.servicesSerializer import (
    ServicioSerializer,
    ServicioDropSerializer,
    ConsumoServicio,
    ConsumoServicioSerializer,
    SuscripcionServicio,
    SuscripcionServicioSerializer,
)


class ServicioListCreateView(generics.ListCreateAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer


class ServicioRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer


class ServicioDropListView(generics.ListAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioDropSerializer


class SuscripcionServicioListCreateView(generics.ListCreateAPIView):
    queryset = SuscripcionServicio.objects.all()
    serializer_class = SuscripcionServicioSerializer


class SuscripcionServicioRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = SuscripcionServicio.objects.all()
    serializer_class = SuscripcionServicioSerializer


class ConsumoServicioListCreateView(generics.ListCreateAPIView):
    queryset = ConsumoServicio.objects.all()
    serializer_class = ConsumoServicioSerializer


class ConsumoServicioRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConsumoServicio.objects.all()
    serializer_class = ConsumoServicioSerializer
