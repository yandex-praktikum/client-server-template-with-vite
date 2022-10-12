import { createSlice } from '@reduxjs/toolkit';

interface CommonState {
  currentUser: string;
  theme: string;
  language: string;
}

const initialState: CommonState = {
  currentUser: 'Yolo man',
  theme: 'default',
  language: 'RU',
};

export const counterSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setUser, setTheme, setLanguage } = counterSlice.actions;

export default counterSlice.reducer;
