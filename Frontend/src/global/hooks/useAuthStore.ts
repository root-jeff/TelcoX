import { setLogin, setLogout } from "../../security/shared";
import { useGlobalStore } from "../redux";
import { UserAuthInterface } from "../../security/interfaces";
import { useNavigate } from "react-router-dom";
import { useAuthStorage } from "./useAuthStorage";
import { Snack } from "../utils";

export const useAuthStore = () => {
  const { SaveJWTInfo, DeleteJWTInfo } = useAuthStorage();

  const { auth, dispatch } = useGlobalStore();

  const navigate = useNavigate();

  const onLogin = async (jwtInfo: UserAuthInterface) => {
    await SaveJWTInfo(jwtInfo).then(() => dispatch(setLogin(jwtInfo)));
  };

  const onLogOut = () =>
    DeleteJWTInfo().then((_) => {
      dispatch(setLogout()),
        navigate("/iniciar-sesion"),
        localStorage.removeItem("lastRoute"),
        window.location.reload();

      Snack.open({
        message: "Sesión cerrada",
        severity: "info",
      });
    });

  return {
    auth,
    dispatch,
    onLogOut,
    onLogin,
  };
};
