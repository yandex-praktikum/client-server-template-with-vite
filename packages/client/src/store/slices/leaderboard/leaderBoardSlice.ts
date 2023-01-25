import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LeaderBoardRequestData } from "@/api/typesApi";
import { RootState } from "@/store/store";

interface InitialState {
    data: LeaderBoardRequestData[];
}

const initialState: InitialState = {
    data: [],
};

export const leaderboardSlice = createSlice({
    name: "leaders",
    initialState,
    reducers: {
        setLeaders: (
            state,
            { payload }: PayloadAction<LeaderBoardRequestData[]>
        ) => {
            state.data = payload;
        },
    },
});

export const leaderboardSelector = {
    leaders: (state: RootState) => state.leaderboard,
};

export const leaderboardActions = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
