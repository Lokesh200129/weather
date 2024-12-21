// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem(`theme_${action.payload.userId}`, state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload; 
      localStorage.setItem(`theme_${action.payload.userId}`, action.payload.theme);
    },
    setInitialTheme: (state, action) => {
      const savedTheme = localStorage.getItem(`theme_${action.payload.userId}`);
      if (savedTheme) {
        state.theme = savedTheme;
      } else {
        state.theme = 'light'; // default theme if not found in localStorage
      }
    },
  },
});

export const { toggleTheme, setTheme, setInitialTheme } = themeSlice.actions;
export default themeSlice.reducer;
