import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { CreateAccountPage, LoginPage } from "../security";
import { PublicRoutes } from "./Components/PublicRoutes";
import { RequireAuth } from "./Components/RequireAuth";
import { useCheckingAuth } from "../global/hooks";
import { useEffect } from "react";
import { MainLayout, NotFoundPage } from "../global/layout";

export const AppRouter = () => {
  const onChecking = useCheckingAuth();

  useEffect(() => {
    onChecking();
  }, []);

  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/iniciar-sesion"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route path="/" element={<Navigate to={"/iniciar-sesion"} replace />} />
        <Route
          path="/*"
          element={
            <PublicRoutes>
              <NotFoundPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/crear-cuenta"
          element={
            <PublicRoutes>
              <CreateAccountPage />
            </PublicRoutes>
          }
        />

        <Route
          path="app/*"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        />
      </>
    )
    // {
    //   future: {
    //     // v7_relativeSplatPath: true, //Un chocolate para la version 7 de react router
    //     v7_fetcherPersist: true,
    //     v7_normalizeFormMethod: true,
    //     v7_partialHydration: true,
    //     v7_skipActionErrorRevalidation: true,
    //   },
    // }
  );
};
