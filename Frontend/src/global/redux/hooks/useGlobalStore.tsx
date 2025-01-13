import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export const useGlobalStore = () => {
  const dispatch = useDispatch();

  const auth = useSelector(({ auth }: RootState) => auth);

  return {
    auth,
    dispatch,
  };
};
