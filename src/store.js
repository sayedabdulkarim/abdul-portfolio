import { configureStore } from "@reduxjs/toolkit";
//reducers
import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/users/authSlice";
// import settingsReducer from "./slices/settings/settingSlice";
import settingsReducer from "./slices/settings/settingSlice";

const store = configureStore({
  reducer: {
    authReducer,
    settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    apiSlice.middleware,
  ],
  //on production change it to false
  devTools: process.env.NODE_ENV === "development",
});

export default store;
