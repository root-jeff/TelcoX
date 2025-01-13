import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../global/hooks";
import useSaveLastRoute from "../../global/hooks/useSaveLastLocation";

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  useSaveLastRoute();
  const { auth } = useAuthStore();
  const isLoggedIn = auth?.accessToken && auth.accessToken !== "";
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/iniciar-sesion" replace state={{ path: pathname }} />;
  }

  return children;
};
