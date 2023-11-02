import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  name: "auth",
  usersList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    logOutUser: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload;
    },
  },
});

export const { setCredentials, logOutUser, setUsersList } = authSlice.actions;

export default authSlice.reducer;
