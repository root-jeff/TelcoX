// Need to use the React-specific entry point to import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiEndpoints, baseQuery } from "../api";
import { UserDataProfile } from "./ProfilePage";

// Define a service using a base URL and expected endpoints
export const AppController = createApi({
  reducerPath: "AppController",
  baseQuery: baseQuery,
  tagTypes: ["Profile"],

  endpoints: ({ mutation, query }) => ({
    //Metodo para obtener el perfil
    getProfile: query<UserDataProfile, number>({
      query: (idUser) => ({
        url: `${ApiEndpoints.perfil}${idUser}/`,
        method: "GET",
      }),

      providesTags: ["Profile"],
    }),
    //Metodo para actualizar perfil
    updateProfile: mutation<void, UserDataProfile & { idProfile: number }>({
      query: (body) => ({
        url: `${ApiEndpoints.perfil}${body.idProfile}/`,
        method: "PUT",
        body,
      }),
    }),
  }),
});
