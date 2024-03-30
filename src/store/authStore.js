import { createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../services/LocalStorageService";

const localStorageService = new LocalStorageService();

const userData = JSON.parse(localStorageService.getItem("user"));

const initialState = {
  isAuthenticated: userData ? true : false,
  user: userData ? userData : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
