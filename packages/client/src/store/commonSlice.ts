import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_USER } from './constants';
import { ICommonState, TInitialUser } from './interfaces';

const initialState: ICommonState = {
  currentUser: INITIAL_USER,
  theme: 'default',
  isAuthModalOpen: false,
  isLoading: false,
  language: 'RU',
};

export const counterSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TInitialUser>) => {
      state.currentUser = action.payload;
    },
    toggleAuthModalState: state => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setUser, toggleAuthModalState, setIsLoading, setTheme, setLanguage } = counterSlice.actions;

export default counterSlice.reducer;
