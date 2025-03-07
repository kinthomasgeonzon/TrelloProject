import { configureStore } from "@reduxjs/toolkit";
import { signupApi } from "@store/api/signupSlice";

export const store = configureStore({
  reducer: {
    [signupApi.reducerPath]: signupApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signupApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
