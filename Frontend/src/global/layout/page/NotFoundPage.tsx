import { Box, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      textAlign="center" // Añadido para centrar el texto en pantallas pequeñas
      padding="1rem" // Añadido para darle espacio en los márgenes
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5">
        Oops! La página que buscas no existe o no tienes permiso para acceder.
      </Typography>
    </Box>
  );
};
