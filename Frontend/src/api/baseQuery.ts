import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { ApiEndpoints } from "./routes";
import { Snack } from "../global/utils";
import { RootState } from "../global/redux/store";
import { ExtraOptions } from "./interfaces";

export const getErrorMessage = (error: FetchBaseQueryError): string =>
  "status" in error && error.status === 401
    ? "Su sesión ha caducado. Por favor, inicie sesión nuevamente."
    : "status" in error && error.status === 404
    ? "Recurso no encontrado."
    : "status" in error &&
      (error.status as number) >= 400 &&
      (error.status as number) < 500
    ? typeof error.data === "string" && !error.data.match(/<html|<\?xml/)
      ? error.data
      : typeof error.data === "object" && "message" in error.data
      ? (error.data as { message: string }).message
      : typeof error.data === "object" && "error_description" in error.data
      ? (error.data as { error_description: string }).error_description
      : "Ocurrió un error en la consulta"
    : "status" in error && (error.status as number) >= 500
    ? "Ocurrió un error en el servidor"
    : "Ocurrió un error inesperado";

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (args, api, extraOptions = {}) => {
  const result = await fetchBaseQuery({
    baseUrl: ApiEndpoints.BaseURL + ApiEndpoints.BaseApi,
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token },
      } = getState() as RootState;
      token && headers.set("Authorization", `Bearer ${token}`);
      !extraOptions?.uploadFile
        ? headers.set("Content-Type", "application/json")
        : headers.delete("Content-Type");
      return headers;
    },
    validateStatus: (response) => {
      return response.status >= 200 && response.status < 300;
    },

    keepalive: extraOptions?.keepalive || true,
  })(args, api, extraOptions);

  result.error &&
    Snack.open({
      title: "Ha ocurrido un error.",
      message: getErrorMessage(result.error),
      severity: "warning",
    });

  return result;
};
