import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Stack,
  IconButton,
  Container,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

export interface UserDataProfile {
  username: string;
  email: string;
  cedula: string;
  telefono: string | null;
  direccion: string | null;
  fecha_registro: string;
  first_name: string;
  last_name: string;
}

interface InfoField {
  icon: React.ReactNode;
  name: string;
  label: string;
  value?: string;
  editMode: boolean;
  disabled?: boolean;
}
import { AppController } from "./AppControler";
import { useGlobalStore } from "../global/redux";
import { Snack } from "../global/utils";
// Schema de validación con Yup
const validationSchema = Yup.object().shape({
  cedula: Yup.string()
    .required("La cédula es requerida")
    .matches(/^\d{10}$/, "La cédula debe tener 10 dígitos numéricos"),
  telefono: Yup.string()
    .nullable()
    .matches(/^\+?1?\d{9,15}$/, "Formato de teléfono inválido"),
  direccion: Yup.string().nullable(),
  first_name: Yup.string().required("El nombre es requerido"),
  last_name: Yup.string().required("El apellido es requerido"),
});
// Componente para mostrar un campo de información
const InfoField = ({
  icon,
  name,
  label,
  value,
  editMode,
  disabled = false,
}: InfoField) => (
  <Box sx={{ display: "flex", alignItems: "start", gap: 2, width: "100%" }}>
    <Box sx={{ color: "primary.main", mt: 2 }}>{icon}</Box>
    {editMode ? (
      <Field name={name}>
        {({ field, meta }: any) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            disabled={disabled}
            size="small"
            sx={{ mt: 1 }}
          />
        )}
      </Field>
    ) : (
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography>{value || "No especificado"}</Typography>
      </Box>
    )}
  </Box>
);

export const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const {
    auth: { idUsuario },
  } = useGlobalStore();
  const { useGetProfileQuery, useUpdateProfileMutation } = AppController;
  const { data, refetch } = useGetProfileQuery(idUsuario);
  const [updateUser, { isLoading }] = useUpdateProfileMutation();

  // Valores iniciales para Formik
  const initialValues: UserDataProfile = {
    username: data?.username || "",
    email: data?.email || "",
    cedula: data?.cedula || "",
    telefono: data?.telefono || "",
    direccion: data?.direccion || "",
    fecha_registro: data?.fecha_registro || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
  };

  const handleSubmit = async (values: UserDataProfile) => {
    await updateUser({ ...values, idProfile: idUsuario })
      .unwrap()
      .then(async () => {
        Snack.open({
          message: "Perfil actualizado exitosamente",
          severity: "success",
        });
        setEditMode(false);
        await refetch();
      })
      .catch(() =>
        Snack.open({
          message: "Error al actualizar el perfil",
          severity: "error",
        })
      );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, resetForm }) => (
          <Form>
            <Paper elevation={3} sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "primary.main",
                    mr: 3,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4">
                    {values.first_name} {values.last_name}
                  </Typography>
                  <Typography color="text.secondary">
                    @{values.username}
                  </Typography>
                </Box>
                <IconButton
                  color={editMode ? "error" : "primary"}
                  onClick={() => {
                    if (editMode) {
                      resetForm();
                    }
                    setEditMode(!editMode);
                  }}
                >
                  {editMode ? <CancelIcon /> : <EditIcon />}
                </IconButton>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Información del usuario */}
              <Stack spacing={3}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <InfoField
                      icon={<PersonIcon />}
                      name="first_name"
                      label="Nombre"
                      value={values.first_name}
                      editMode={editMode}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <InfoField
                      icon={<PersonIcon />}
                      name="last_name"
                      label="Apellido"
                      value={values.last_name}
                      editMode={editMode}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <InfoField
                      icon={<BadgeIcon />}
                      name="cedula"
                      label="Cédula"
                      value={values.cedula}
                      editMode={editMode}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <InfoField
                      icon={<PhoneIcon />}
                      name="telefono"
                      label="Teléfono"
                      value={values.telefono || ""}
                      editMode={editMode}
                    />
                  </Box>
                </Box>

                <InfoField
                  icon={<HomeIcon />}
                  name="direccion"
                  label="Dirección"
                  value={values.direccion || ""}
                  editMode={editMode}
                />

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <InfoField
                      icon={<PersonIcon />}
                      name="email"
                      label="Correo Electrónico"
                      value={values.email}
                      editMode={editMode}
                      disabled
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px" }}>
                    <InfoField
                      icon={<CalendarIcon />}
                      name="fecha_registro"
                      label="Fecha de Registro"
                      value={new Date(
                        values.fecha_registro
                      ).toLocaleDateString()}
                      editMode={false}
                      disabled
                    />
                  </Box>
                </Box>
              </Stack>

              {/* Botones de acción */}
              {editMode && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 4,
                    gap: 2,
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    disabled={isLoading}
                  >
                    Guardar Cambios
                  </Button>
                </Box>
              )}
            </Paper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
