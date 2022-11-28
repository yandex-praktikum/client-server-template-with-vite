import { createSelector } from '@reduxjs/toolkit';

import { userApi } from '../queries/user.api';

export const getUserSelector = userApi.endpoints.getUser.select();

export const getUserIdSelector = createSelector(getUserSelector, result =>
  result.isSuccess ? result.data?.id : undefined
);
