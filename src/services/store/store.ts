import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApi } from "../api/auth_api.ts";
import { contestApi } from "../api/contest_api.ts";
import { photoApi } from "../api/photo_api.ts";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contestApi.reducerPath]: contestApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      contestApi.middleware,
      photoApi.middleware,
    ),
});

// Установка слушателей для RTK Query
setupListeners(store.dispatch);
export default store;
