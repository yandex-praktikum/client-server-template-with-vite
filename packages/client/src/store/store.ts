import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user/userSlice";
import { leaderboardReducer } from "@/store/slices/leaderboard/leaderBoardSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        leaderboard: leaderboardReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
