import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../global/hooks";

interface RequireAuthProps {
  children: JSX.Element;
}

export const PublicRoutes = ({ children }: RequireAuthProps) => {
  const { auth } = useAuthStore();

  const isLoggedIn = auth?.accessToken && auth.accessToken !== "";
  const location = useLocation();

  const publicPaths = ["/iniciar-sesion", "/crear-cuenta"];

  // Redirigir solo si el usuario está en una ruta pública y autenticado
  if (isLoggedIn && publicPaths.includes(location.pathname)) {
    return <Navigate to={"/app"} replace state={{ path: location.pathname }} />;
  }

  return children;
};
