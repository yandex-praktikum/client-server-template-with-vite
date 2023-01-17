import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user/userSlice";

const preloadedState =
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined;

export const createStore = (
    preloadedState: Record<string, unknown> | undefined
) => {
    return configureStore({
        reducer: {
            user: userReducer,
        },
        preloadedState,
    });
};

const store = createStore(preloadedState);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
