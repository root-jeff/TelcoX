import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "::-webkit-scrollbar": {
          width: "8px", // Ancho del scroll
          height: "8px", // Altura del scroll horizontal
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0", // Color del fondo del track
          borderRadius: "4px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#2a337f", // Color del thumb
          borderRadius: "4px",
          border: "2px solid #f0f0f0", // Espaciado entre el thumb y el track
        },
        "::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#1a255b", // Color del thumb al pasar el mouse
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#161e37", // Color principal
      light: "#505aa5", // Un tono más claro del principal
      dark: "#1e2561", // Un tono más oscuro del principal
      contrastText: "#ffffff", // Texto que contraste con el color principal
      "100": "#b3d4fc",
      "200": "#a0bfee", // Variantes adicionales para consistencia
      "300": "#8ba7e0",
      "400": "#7592d1",
      "500": "#607dc3",
      "600": "#4b68b5",
      "700": "#3652a7",
      "800": "#223c99",
      "900": "#112088",
    },
    secondary: {
      main: "#662d87", // Color principal
      light: "#8a51aa", // Tono más claro
      dark: "#4b2065", // Tono más oscuro
      contrastText: "#ffffff", // Texto que contraste
      "100": "#e3cbe4",
      "200": "#d4a2d5",
      "300": "#c67ac7",
      "400": "#b953b8",
      "500": "#ac2da9",
      "600": "#962489",
      "700": "#801c69",
      "800": "#6a1450",
      "900": "#541139",
    },
    error: {
      main: "#ff1744", // Red A400
      light: "#ff616f", // Tono más claro
      dark: "#c4001d", // Tono más oscuro
      contrastText: "#ffffff",
      "100": "#ffe5e9",
      "200": "#ffbcc1",
      "300": "#ff9398",
      "400": "#ff6a70",
      "500": "#ff4147",
      "600": "#e6303a",
      "700": "#cc282e",
      "800": "#b21f22",
      "900": "#990b0d",
    },
    background: {
      default: "#ffffff", // Fondo principal
      paper: "#f5f5f5", // Fondo para componentes tipo papel
    },
    grey: {
      "50": "#fdfdfd",
      "100": "#fafafa",
      "200": "#f5f5f5",
      "300": "#eeeeee",
      "400": "#e0e0e0",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
    },
    success: {
      main: "#4caf50", // Verde principal
      light: "#81c784", // Tono más claro
      dark: "#388e3c", // Tono más oscuro
      contrastText: "#ffffff",
      "100": "#e8f5e9",
      "200": "#c8e6c9",
      "300": "#a5d6a7",
      "400": "#81c784",
      "500": "#4caf50",
      "600": "#43a047",
      "700": "#388e3c",
      "800": "#2e7d32",
      "900": "#1b5e20",
    },
    warning: {
      main: "#ff9800", // Naranja principal
      light: "#ffb74d", // Tono más claro
      dark: "#f57c00", // Tono más oscuro
      contrastText: "#ffffff",
      "100": "#fff3e0",
      "200": "#ffe0b2",
      "300": "#ffcc80",
      "400": "#ffb74d",
      "500": "#ff9800",
      "600": "#fb8c00",
      "700": "#f57c00",
      "800": "#ef6c00",
      "900": "#e65100",
    },
    info: {
      main: "#2196f3", // Azul principal
      light: "#64b5f6", // Tono más claro
      dark: "#1976d2", // Tono más oscuro
      contrastText: "#ffffff",
      "100": "#e3f2fd",
      "200": "#bbdefb",
      "300": "#90caf9",
      "400": "#64b5f6",
      "500": "#2196f3",
      "600": "#1e88e5",
      "700": "#1976d2",
      "800": "#1565c0",
      "900": "#0d47a1",
    },
  },
});

export default theme;
