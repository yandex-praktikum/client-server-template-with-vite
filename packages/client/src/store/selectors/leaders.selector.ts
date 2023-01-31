import { RootState } from '../store';

export const selectLeaders = (state: RootState) => state.leaders.leaderboard;
