from api.serializers.userSerializer import UsuarioSerializer
from api.modelos.userModel import Usuario
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.views import LogoutView
from django.shortcuts import redirect
from decouple import config
from django.forms import ValidationError


class RegisterView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    """
    def validate_cedula(self, cedula):
        # Verificar longitud de la cédula
        if len(cedula) != 10:
            raise ValidationError("La longitud debe ser de 10 dígitos.")
        # Verificar que todos los caracteres sean dígitos
        if not cedula.isdigit():
            raise ValidationError("Debe contener solo dígitos.")
        # Verificar la provincia
        provincia = int(cedula[:2])
        if (provincia < 1 or provincia > 24) and provincia != 30:
            raise ValidationError("La provincia no es válida.")
        # Aplicar el algoritmo de Luhn
        digitos = list(map(int, cedula[:-1]))
        for i in range(0, 9, 2):
            digitos[i] *= 2
            if digitos[i] > 9:
                digitos[i] -= 9
        suma_total = sum(digitos)
        digito_verificador = (10 - (suma_total % 10)) % 10
        if digito_verificador != int(cedula[-1]):
            raise ValidationError("Cédula inválida.")
        return cedula
    
    """

    def create(self, request, *args, **kwargs):
        # Validar datos del serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Extraer datos validados
        validated_data = serializer.validated_data

        # Validar la cédula
        # self.validate_cedula(validated_data["cedula"])

        # Extraer y manejar la contraseña
        password = validated_data.pop("password", None)

        # Crear o actualizar el usuario
        user, created = Usuario.objects.update_or_create(
            cedula=validated_data["cedula"],
            defaults={
                **validated_data,
                "is_active": True,
            },
        )

        print()

        # Establecer la contraseña si fue proporcionada
        if password:
            user.set_password(password)
            user.save()

        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Usuario registrado exitosamente.",
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Debe proporcionar nombre de usuario y contraseña."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Valida que exista el usuario
        # user = authenticate(username=username, password=password)
        try:
            # Intenta obtener el usuario basado en el nombre de usuario
            user = Usuario.objects.get(username=username)
        except Usuario.DoesNotExist:
            print("Usuario no registrado")
            return Response("Usuario no registrado", status=status.HTTP_404_NOT_FOUND)

        isValidUser = user.check_password(password)

        print(isValidUser, username, password)

        if isValidUser:
            if user.is_active:
                # Generar los tokens
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token

                return Response(
                    {
                        "accessToken": str(access_token),
                        "refreshToken": str(refresh),
                        "usuario": username,
                        "idUsuario": user.id,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Cuenta desactivada. Contacte al administrador."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        else:
            return Response(
                {"error": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED
            )


class LogOutView(APIView):
    def post(self, request):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie("refreshToken")
        return redirect(config("CORS_ALLOWED_ORIGINS"))
