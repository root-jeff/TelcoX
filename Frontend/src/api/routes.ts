const ServerUrl = {
  produccion: "",
  local: "http://localhost:8000",
};

export const ApiEndpoints = {
  BaseURL: ServerUrl.local,
  BaseApi: "/api",
  //#region Seguridad
  login: "/auth/login/",
  register: "/auth/register/",
  perfil: "/profile/",
};
