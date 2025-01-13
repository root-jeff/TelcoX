import { Box, Typography } from "@mui/material";
import { BasePage } from "../global/layout";

export const HomePage = () => {
  return (
    <BasePage>
      <Box>
        <Typography
          color={"grey.400"}
          height={"20rem"}
          variant="h5"
          component="h1"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          Bienvenido, por favor seleccione una opción del menú lateral, esta en
          la pantalla {location.pathname}
        </Typography>
      </Box>
    </BasePage>
  );
};
