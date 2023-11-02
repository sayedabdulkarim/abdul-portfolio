import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTheme: localStorage.getItem("selectedTheme")
    ? JSON.parse(localStorage.getItem("selectedTheme"))
    : null,
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
  },
});

export const { setSelectedTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
