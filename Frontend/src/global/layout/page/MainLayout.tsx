import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { DictionaryRoutes } from "../../../routers/Components/Routes";
import {
  AppBar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { AccountCircleOutlined, Logout, Person } from "@mui/icons-material";
import { useAuthStore } from "../../hooks";
import { logos } from "../../../theme";
import { useState } from "react";

export const MainLayout = () => {
  const getRoutes = () =>
    DictionaryRoutes.map(({ component, nombre, path }) => (
      <Route path={path} element={component} key={`screen-${nombre}`} />
    ));

  const { logoAzul } = logos();
  const { onLogOut } = useAuthStore();
  const navigate = useNavigate();
  // Estado para el menú de perfil
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Manejadores de eventos
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("perfil");
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static" color="default">
          <Toolbar
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                maxWidth: "240px",
                minWidth: "120px",
                px: { xs: 1, sm: 2, md: 3 },
              }}
            >
              <img
                src={logoAzul}
                alt={"Logo"}
                style={{
                  width: "70%",
                  objectFit: "contain",
                }}
                draggable={false}
              />
            </Box>

            <Box>
              {/* Botón de Perfil */}
              <Tooltip title="Cuenta">
                <IconButton
                  onClick={handleProfileClick}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <AccountCircleOutlined />
                </IconButton>
              </Tooltip>

              {/* Menú de Perfil */}
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfile}>
                  <Person sx={{ mr: 2 }} /> Perfil
                </MenuItem>
                <Divider />
                <MenuItem onClick={onLogOut}>
                  <Logout sx={{ mr: 2 }} /> Cerrar Sesión
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Outlet />
        <Routes>{getRoutes()}</Routes>
      </Box>
    </Box>
  );
};
