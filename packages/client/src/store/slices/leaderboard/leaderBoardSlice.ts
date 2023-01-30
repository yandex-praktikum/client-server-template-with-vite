import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LeaderBoardRequestData } from "@/api/typesApi";
import { RootState } from "@/store/store";
import { getLeaderboard } from "@/api/LeaderboardApi";

interface InitialState {
    data: LeaderBoardRequestData[];
    fetching: boolean;
}

const initialState: InitialState = {
    data: [],
    fetching: false,
};

export const extraActions = {
    get: createAsyncThunk(
        "pages/leaderboard/get",
        async () => await getLeaderboard()
    ),
};

export const leaderboardSlice = createSlice({
    name: "leaders",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(extraActions.get.pending, state => {
                state.fetching = true;
            })
            .addCase(extraActions.get.fulfilled, (state, action) => {
                state.fetching = false;
                state.data = action.payload.data;
            })
            .addCase(extraActions.get.rejected, state => {
                state.fetching = false;
            });
    },
});

export const leaderboardSelector = {
    leaders: (state: RootState) => state.leaderboard,
};

export const leaderboardActions = {
    ...leaderboardSlice.actions,
    ...extraActions,
};
export const leaderboardReducer = leaderboardSlice.reducer;
