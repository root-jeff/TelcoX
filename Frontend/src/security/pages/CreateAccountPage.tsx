// UserRegistration.tsx
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Home,
  Badge,
  Visibility,
  VisibilityOff,
  Save,
  Clear,
} from "@mui/icons-material";
import { Snack } from "../../global/utils";
import { SecurityController } from "../controllers";
import { useNavigate } from "react-router-dom";

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  cedula: string;
  telefono: string;
  direccion: string;
  first_name: string;
  last_name: string;
}

interface TextFieldProps {
  name: string;
  label: string;
  type?: string;
  icon: React.ReactNode;
  fullWidth?: boolean;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "El usuario debe tener al menos 4 caracteres")
    .required("El usuario es requerido"),
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Confirme la contraseña"),
  cedula: Yup.string()
    .matches(/^\d{10}$/, "La cédula debe tener 10 dígitos numéricos")
    .required("La cédula es requerida"),
  telefono: Yup.string().matches(
    /^\+?1?\d{9,15}$/,
    "Formato de teléfono inválido"
  ),
  direccion: Yup.string(),
  first_name: Yup.string().required("El nombre es requerido"),
  last_name: Yup.string().required("El apellido es requerido"),
});

const CustomTextField = ({
  name,
  label,
  type = "text",
  icon,
  fullWidth = true,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field name={name}>
      {({ field, meta }: any) => (
        <TextField
          {...field}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          label={label}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          fullWidth={fullWidth}
          slotProps={{
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      )}
    </Field>
  );
};

const initialValues: RegistrationData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  cedula: "",
  telefono: "",
  direccion: "",
  first_name: "",
  last_name: "",
};
export const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [crearCuenta, { isLoading }] =
    SecurityController.useCrearCuentaMutation();

  const handleSubmit = async (values: RegistrationData, { resetForm }: any) => {
    await crearCuenta(values)
      .unwrap()
      .then(() => {
        Snack.open({
          message: "Usuario registrado exitosamente",
          severity: "success",
        });
        resetForm();
        navigate("crear-cuenta");
      })
      .catch(() =>
        Snack.open({
          message: "Error al registrar el usuario",
          severity: "error",
        })
      );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Registro de Usuario
          </Typography>
          <Typography color="text.secondary">
            Complete el formulario para crear una nueva cuenta
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h6" color="primary">
                  Información Personal
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="first_name"
                      label="Nombre"
                      icon={<Person />}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="last_name"
                      label="Apellido"
                      icon={<Person />}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="cedula"
                      label="Cédula"
                      icon={<Badge />}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="telefono"
                      label="Teléfono"
                      icon={<Phone />}
                    />
                  </Box>
                </Box>

                <CustomTextField
                  name="direccion"
                  label="Dirección"
                  icon={<Home />}
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" color="primary">
                  Información de Cuenta
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="username"
                      label="Usuario"
                      icon={<Person />}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="email"
                      label="Email"
                      type="email"
                      icon={<Email />}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="password"
                      label="Contraseña"
                      type="password"
                      icon={<Person />}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <CustomTextField
                      name="confirmPassword"
                      label="Confirmar Contraseña"
                      type="password"
                      icon={<Person />}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    color="error"
                    startIcon={<Clear />}
                    onClick={() => resetForm()}
                    disabled={isLoading}
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                    disabled={isLoading}
                  >
                    Registrar
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};
