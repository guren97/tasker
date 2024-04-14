import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import taskReducer from "../slices/taskSlice.js";
import { apiSlice } from "../slices/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
