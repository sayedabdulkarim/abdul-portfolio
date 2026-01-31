import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTheme: localStorage.getItem("selectedTheme")
    ? JSON.parse(localStorage.getItem("selectedTheme"))
    : null,
  selectedLanguage: localStorage.getItem("selectedLanguage") || "en",
  isLanguageChanging: false,
  name: "settings",
};

const settingsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSelectedTheme: (state, action) => {
      state.selectedTheme = action.payload;
      localStorage.setItem("selectedTheme", JSON.stringify(action.payload));
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
      localStorage.setItem("selectedLanguage", action.payload);
    },
    setLanguageChanging: (state, action) => {
      state.isLanguageChanging = action.payload;
    },
  },
});

export const { setSelectedTheme, setSelectedLanguage, setLanguageChanging } = settingsSlice.actions;

export default settingsSlice.reducer;
