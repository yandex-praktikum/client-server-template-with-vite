import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TGame } from '../../../../../shared/types';
import { ICommonState, IMultiPLayerScore } from '../types/commonState';

export const INITIAL_STATE: ICommonState = {
  theme: 'default',
  isAuthModalOpen: false,
  language: 'RU',
  currentGame: null,
  lastScore: null,
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
    setLastScore: (state, action: PayloadAction<IMultiPLayerScore[] | null>) => {
      state.lastScore = action.payload;
    },
  },
});

export const { toggleAuthModalState, setGame, setTheme, setLanguage, setLastScore } = counterSlice.actions;

export default counterSlice.reducer;
