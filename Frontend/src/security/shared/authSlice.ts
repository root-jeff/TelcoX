import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserAuthInterface } from "../interfaces";

const initialState: UserAuthInterface = {
  accessToken: "",
  usuario: "",
  refreshToken: "",
  idUsuario: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (_state, action: PayloadAction<UserAuthInterface>) => {
      return action.payload;
    },
    setLogout: (state) => {
      state.accessToken = initialState.accessToken;
      state.usuario = initialState.usuario;
      state.refreshToken = initialState.refreshToken;
      state.idUsuario = initialState.idUsuario;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
