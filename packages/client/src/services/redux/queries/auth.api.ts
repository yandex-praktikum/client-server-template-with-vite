import { api, commonFetchArgs } from './api';

import type { TLoginData, TSignupData } from '../../../../../shared/types';

const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Response, TLoginData>({
      query: body => ({
        url: 'auth/signin',
        method: 'POST',
        body,
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getUser'],
    }),
    signup: build.mutation<Response, TSignupData>({
      query: body => ({
        url: 'auth/signup',
        method: 'POST',
        body,
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getUser'],
    }),
    logout: build.mutation<unknown, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getUser'],
    }),
  }),
});

export const { useLogoutMutation, useSignupMutation, useLoginMutation } = authApi;
