// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../api/baseQuery";
import { UserAuthInterface } from "../interfaces/UserAuthInterface";
import { LoginformInterface } from "../interfaces/SecurityInterface";
import { ApiEndpoints } from "../../api/routes";
import { RegistrationData } from "../pages";

// Define a service using a base URL and expected endpoints
export const SecurityController = createApi({
  reducerPath: "SecurityController",
  baseQuery: baseQuery,
  tagTypes: ["MenuRol"],

  endpoints: ({ mutation }) => ({
    postLogin: mutation<UserAuthInterface, LoginformInterface>({
      query: (body) => ({
        url: ApiEndpoints.login,
        method: "POST",
        body,
      }),
    }),

    crearCuenta: mutation<void, RegistrationData>({
      query: (body) => ({
        url: ApiEndpoints.register,
        method: "POST",
        body,
      }),
    }),
  }),
});
