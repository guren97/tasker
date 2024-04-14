import { configureStore } from "react-redux";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
