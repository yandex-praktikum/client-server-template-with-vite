import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/store/slices/user/userSlice";
import { leaderboardReducer } from "@/store/slices/leaderboard/leaderBoardSlice";
import { themeReducer } from "@/store/slices/theme/themeSlice";

const preloadedState =
    typeof window !== "undefined" ? window.__PRELOADED_STATE__ : undefined;

export const createStore = (
    preloadedState: Record<string, unknown> | undefined
) => {
    return configureStore({
        reducer: {
            user: userReducer,
            leaderboard: leaderboardReducer,
            theme: themeReducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ serializableCheck: false }),
        preloadedState,
    });
};

const store = createStore(preloadedState);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
