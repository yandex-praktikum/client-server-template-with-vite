import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TGame } from '../../../../../shared/types';
import { ICommonState } from '../types/commonState';

export const INITIAL_STATE: ICommonState = {
  theme: 'default',
  isAuthModalOpen: false,
  language: 'RU',
  currentGame: null,
};

export const counterSlice = createSlice({
  name: 'common',
  initialState: INITIAL_STATE,
  reducers: {
    toggleAuthModalState: state => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setGame: (state, action: PayloadAction<TGame | null>) => {
      state.currentGame = action.payload;
    },
  },
});

export const { toggleAuthModalState, setGame, setTheme, setLanguage } = counterSlice.actions;

export default counterSlice.reducer;
