import { createSelector } from '@reduxjs/toolkit';

import { AUTHORIZED_ROUTES, UNAUTHORIZED_ROUTES } from '../../utils/routes';
import { RootState } from '../store';

const selectAuth = ({ auth }: RootState) => auth;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export const selectUserRoutes = createSelector(selectAuth, ({ userInfo }) =>
  userInfo ? AUTHORIZED_ROUTES : UNAUTHORIZED_ROUTES
);
