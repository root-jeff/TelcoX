import { ReactNode } from "react";
import { HomePage } from "../../app/HomePage";
import { TelcoDashboard } from "../../app/TelcolDashboadPage";
import { ProfilePage } from "../../app/ProfilePage";

export interface DictionaryRoutes {
  nombre: string;
  path: string;
  component: ReactNode;
}

export const DictionaryRoutes: DictionaryRoutes[] = [
  {
    nombre: "Dashboard",
    path: "",
    component: <TelcoDashboard />,
  },
  {
    nombre: "Notificaciones",
    path: "notificaciones",
    component: <HomePage />,
  },
  {
    nombre: "Historial",
    path: "historial",
    component: <HomePage />,
  },
  {
    nombre: "Historial",
    path: "historial",
    component: <HomePage />,
  },
  {
    nombre: "Perfil",
    path: "perfil",
    component: <ProfilePage />,
  },
];
