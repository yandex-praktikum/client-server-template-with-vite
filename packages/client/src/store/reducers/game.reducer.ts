import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { EGameStatus } from '../../enums/gameStatus.enum';
import { IGame } from '../../types/game.interface';

const initialState: IGame = {
  status: EGameStatus.START,
  score: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state: IGame, { payload }: PayloadAction<EGameStatus>) => {
      state.status = payload;
    },
    setScore: (state: IGame, { payload }: PayloadAction<number>) => {
      state.score = payload;
    },
  },
});

export const { setStatus, setScore } = gameSlice.actions;

export default gameSlice.reducer;
