import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store.ts";

interface AuthState {
    token: string | null;
    userId: string | null;
}

const initialState: AuthState = {
    token: null,
    userId: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (
            state,
            action: PayloadAction<{ token: string; userId: string }>
        ) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("userId", action.payload.userId);
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        },
    },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectUserId = (state: RootState) => state.auth.userId;
export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
