import { createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../services/LocalStorageService";

const localStorageService = new LocalStorageService();

const themeData = localStorageService.getItem("theme");

const initialState = {
    theme: themeData ?? 'light-theme',
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
        localStorageService.setItem("theme", action.payload);
        state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
