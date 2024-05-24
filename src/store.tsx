import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
