import * as yup from "yup";
import { baseValidations } from "../../global/globalValidations";

export const loginSchema = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const LoginFormValidate = yup.object({
    username: baseValidations.campoRequerido("El usuario es requerido"),
    password: baseValidations.campoRequerido("La contraseña es requerida"),
  });

  return {
    initialValues,
    LoginFormValidate,
  };
};
