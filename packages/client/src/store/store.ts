import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user/userSlice";

const preloadedState =
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined;

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
});

delete window.__PRELOADED_STATE__;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
