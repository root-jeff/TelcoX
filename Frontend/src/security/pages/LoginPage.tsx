import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { SecurityController } from "../controllers/SecurityController";
import { useEffect } from "react";
import { CustomButton } from "../../global/components/CustomButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../global/utils";
import { CustomInput, CustomTextButton } from "../../global/components";
import { logos } from "../../theme";
import { useAuthStore } from "../../global/hooks";
import { loginSchema } from "../validation";

export const LoginPage = () => {
  const { logoAzul } = logos();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { usePostLoginMutation } = SecurityController;
  const [postLogin, { isSuccess }] = usePostLoginMutation();
  const { onLogin, auth } = useAuthStore();
  const { initialValues, LoginFormValidate } = loginSchema();

  useEffect(() => {
    if (auth.accessToken && isSuccess) {
      navigate("/app");
      window.location.reload();
    }
    auth;
  }, [auth, navigate]);

  const { values, handleBlur, handleSubmit, touched, errors, handleChange } =
    useFormik({
      initialValues,
      validationSchema: LoginFormValidate,
      onSubmit: async (values) => {
        Loader.show();
        await postLogin(values)
          .unwrap()
          .then((dataAuth) => {
            console.log(JSON.stringify(dataAuth, null, 3));
            onLogin(dataAuth).then(() => navigate(state?.path || "/app"));
          })
          .finally(() => Loader.hide());
      },
    });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          height: { xs: "40%", md: "100%" },
          width: { xs: "100%", md: "40%" },
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            backgroundColor: "inheret",
            width: { xs: "80%", sm: "60%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              backgroundImage: `url(${logoAzul})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "3rem",
              width: "100%",
              marginBottom: "2rem",
              marginTop: "1.5rem",
              userSelect: "none", // Previene la selección de texto en el fondo
              pointerEvents: "none", // Evita la interacción con el fondo (como el arrastre)
              cursor: "default",
            }}
          />
          <Typography variant={"h6"}>Iniciar Sesión</Typography>
          <CustomInput
            label="Usuario"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />

          <CustomInput
            label="Contraseña"
            name="password"
            type="password"
            password={true}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            width="100%"
            margin="1rem 0"
          >
            <CustomTextButton
              label="Crear una cuenta"
              onClick={() => navigate("/crear-cuenta")}
            />
          </Box>
          <CustomButton
            type="submit"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              width: "100%",
            }}
            label="Iniciar Sesión"
          />
        </Box>
      </Box>
    </Box>
  );
};
