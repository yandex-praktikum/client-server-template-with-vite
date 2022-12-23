import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EGameStatus } from '../../enums/gameStatus.enum';
import { IGame } from '../../types/game.interface';

const initialState: IGame = {
  status: EGameStatus.START,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStatus: (state: IGame, action: PayloadAction<EGameStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = gameSlice.actions;

export default gameSlice.reducer;
