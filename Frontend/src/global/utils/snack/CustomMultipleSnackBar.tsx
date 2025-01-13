import * as React from "react";
import {
  Alert,
  Box,
  IconButton,
  keyframes,
  LinearProgress,
  Slide,
  Snackbar,
  styled,
} from "@mui/material";
import { SnackbarProps } from "./SnackBarInterface";
import { GridCloseIcon } from "@mui/x-data-grid";
import { Snack } from "./MultiSnack";

const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ProgressWrapper = styled(Box)(({ theme }) => ({
  width: "95%", // Ocupa el 95% del ancho de la alerta
  margin: "auto", // Centra horizontalmente dentro del contenedor
  marginTop: theme.spacing(1), // Espaciado superior
  position: "absolute", // Para asegurarse de que se posicione dentro del contenedor relativo
  bottom: 0, // Posicionamiento en la parte inferior del contenedor relativo
  left: 0, // Alineado con el borde izquierdo
  right: 0, // Asegura que esté centrado junto con `margin: auto`
  ".MuiLinearProgress-bar": {
    transition: "transform 0.2s linear",
  },
}));

const StyledSnackbar = styled(Snackbar)(() => ({
  "& .MuiAlert-root": {
    minWidth: "288px",
    maxWidth: "500px",
    position: "relative", // Asegura que el contenedor sea relativo
    paddingBottom: "5px", // Espacio para el progreso
  },
  "& .MuiSnackbar-root": {
    transition: "margin-bottom 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "&.slide-out-right": {
    animation: `${slideOutRight} 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  },
}));

export const CustomMultipleSnackBar = React.memo(() => {
  const [snacks, setSnacks] = React.useState<SnackbarProps[]>([]);
  const maxSnack = 3;

  React.useEffect(() => {
    const handleSnackBar = (newOptions: SnackbarProps) => {
      requestAnimationFrame(() => {
        setSnacks((prev) => {
          if (newOptions.open) {
            const activeSnacks = prev.filter((s) => s.open); //activos

            if (activeSnacks.length >= maxSnack) {
              return [...prev.slice(1), newOptions];
            }

            // Actualizar si ya existe un snack con el mismo ID
            const updated = prev.map((s) =>
              s.id === newOptions.id ? { ...s, ...newOptions } : s
            );

            // Si no existe, añade el nuevo
            return updated.some((s) => s.id === newOptions.id)
              ? updated
              : [...prev, newOptions];
          } else {
            //Lo cierra xd
            return prev.map((s) =>
              s.id === newOptions.id ? { ...s, open: false } : s
            );
          }
        });
      });
    };

    Snack.subscribe(handleSnackBar);
    return () => Snack.unsubscribe(handleSnackBar);
  }, []);

  const handleClose = (id: string, reason?: string) => {
    // Solo cerrar si no es un clickaway
    if (reason !== "clickaway") {
      Snack.close(id);
    }
  };

  const defaultAction = (id: string) => (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleClose(id)}
      edge="end"
    >
      <GridCloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      {snacks.map(({ id, open, autoHideDuration, ...snack }) => (
        <StyledSnackbar
          key={id}
          open={open}
          transitionDuration={300}
          TransitionComponent={Slide}
          autoHideDuration={snack.isAutoHide ? autoHideDuration : undefined}
          onClose={(_, reason) => handleClose(id, reason)}
          anchorOrigin={{
            vertical: snack.vertical || "bottom",
            horizontal: snack.horizontal || "right",
          }}
          sx={{
            // Calcula el margen basado en los Snackbars abiertos
            marginBottom: `${
              snacks.filter((s) => s.open).findIndex((s) => s.id === id) *
              (snack.title ? 80 : 55)
            }px`,
            overflow: "hidden",
            ...snack.style,
          }}
          TransitionProps={{
            mountOnEnter: true,
            unmountOnExit: true,
            timeout: 300,
            onExited: () => {
              setSnacks((prev) => {
                const updatedSnacks = prev.filter((snack) => snack.open);
                return updatedSnacks;
              });
            },
          }}
        >
          <Alert
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
            title={snack.title}
            severity={snack.severity}
            onClose={() => handleClose(id)}
            action={snack.action || defaultAction(id)}
            variant={snack.typeAlert || "filled"}
          >
            {snack.title && (
              <Box component="div" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {snack.title}
              </Box>
            )}
            {snack.message}
            {snack.showProgress && (
              <ProgressWrapper>
                <LinearProgress
                  variant={
                    typeof snack.progress === "number"
                      ? "determinate"
                      : "indeterminate"
                  }
                  sx={{ borderRadius: 8, mb: 1 }}
                  value={snack.progress}
                />
              </ProgressWrapper>
            )}
          </Alert>
        </StyledSnackbar>
      ))}
    </>
  );
});

export default CustomMultipleSnackBar;
