import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { recentesReducer } from "./recentesSlice";

export const store = configureStore({
    reducer:{
        auth : authReducer,
        recentes: recentesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;