import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStorage } from "./useAuthStorage";

const useSaveLastRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { CheckJWTInfo } = useAuthStorage();

  const verifyToken = async () =>
    await CheckJWTInfo().then((check) => {
      check && localStorage.setItem("lastRoute", pathname);
    });

  // Guardar la última ruta cuando cambia la ubicación
  useEffect(() => {
    verifyToken();
  }, [pathname, CheckJWTInfo]);

  // Redirigir a la última ruta cuando se carga la app
  useEffect(() => {
    const lastRoute = localStorage.getItem("lastRoute");

    if (CheckJWTInfo() && lastRoute) {
      navigate(lastRoute); // Redirigir a la última ruta guardada
    }
  }, [navigate]);
};

export default useSaveLastRoute;
