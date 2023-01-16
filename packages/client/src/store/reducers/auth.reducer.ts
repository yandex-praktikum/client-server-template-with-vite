import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserInfo } from '../../types/userInfo';

export interface IAuthState {
  userInfo: IUserInfo | null;
}

const initialState: IAuthState = {
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (
      state: IAuthState,
      { payload }: PayloadAction<IUserInfo | null>
    ) => {
      state.userInfo = payload;
    },
  },
});

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
