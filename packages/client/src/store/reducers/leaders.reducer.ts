import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { LeaderData } from '@src/types/leaders';

export interface ILeadersState {
    leaderboard: Array<LeaderData>;
};
const initialState: ILeadersState = {
    leaderboard: [],
};

export const leadersSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setLeaders: (
            state: ILeadersState,
            { payload }: PayloadAction<Array<LeaderData>>
        ) => {
            state.leaderboard = payload;
        },
    },
});

export const { setLeaders } = leadersSlice.actions;

export default leadersSlice.reducer;
