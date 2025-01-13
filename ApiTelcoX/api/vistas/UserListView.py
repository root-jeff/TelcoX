from api.modelos.userModel import Usuario
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from api.serializers.userSerializer import UsuarioSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


class UsuarioList(generics.ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioActions(APIView):
    # authentication_classes = [JWTAuthentication, SessionAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            usuario = Usuario.objects.get(pk=id)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data, status=200)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)

    def put(self, request, id):
        """Actualiza los datos de un usuario."""
        usuario = get_object_or_404(Usuario, pk=id)
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """
        Marca al usuario como inactivo en lugar de eliminarlo físicamente.
        """
        usuario = get_object_or_404(Usuario, pk=id)
        if not usuario.is_active:
            return Response(
                {"error": "El usuario ya está inactivo."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        usuario.is_active = False
        usuario.save()
        return Response(
            {"message": f"Usuario con ID {id} desactivado correctamente."},
            status=status.HTTP_204_NO_CONTENT,
        )
