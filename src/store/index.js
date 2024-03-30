import { configureStore } from "@reduxjs/toolkit";
import auth from "./authStore";
import theme from "./themeStore";

export const store = configureStore({
  reducer: {
    auth,
    theme
  },
});
