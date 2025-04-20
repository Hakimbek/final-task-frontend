import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi.ts";
import { setupListeners } from '@reduxjs/toolkit/query'
import SearchReducer from "../slice/searchSlice.ts";
import AuthReducer from "../slice/authSlice.ts";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        search: SearchReducer,
        auth: AuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
