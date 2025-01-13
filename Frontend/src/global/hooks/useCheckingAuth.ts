import { useAuthStorage } from ".";
import { setLogin, setLogout } from "../../security";
import { useGlobalStore } from "../redux";

export const useCheckingAuth = () => {
  const { GetJWTInfo, CheckJWTInfo } = useAuthStorage();
  const { dispatch } = useGlobalStore();

  const onChecking = async () => {
    try {
      const isValidJWT = await CheckJWTInfo();

      if (isValidJWT) {
        const jwtInfo = await GetJWTInfo();
        dispatch(setLogin(jwtInfo));
      } else {
        dispatch(setLogout());
      }
    } catch (error) {
      dispatch(setLogout());
    }
  };

  return onChecking;
};
