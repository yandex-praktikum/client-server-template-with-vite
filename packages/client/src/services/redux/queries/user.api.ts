import { api, commonFetchArgs } from './api';

import { TUser } from '../../../../../shared/types';
import { TChangePasswordData } from '../../../../../shared/types/apiTypes/changePassword';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<TUser, void>({
      query: () => ({
        url: 'auth/user',
        ...commonFetchArgs,
      }),
      providesTags: ['getUser'],
    }),
    updateAvatar: build.mutation<TUser, FormData>({
      query: formData => ({
        url: 'user/profile/avatar',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['getUser'],
    }),
    updateProfile: build.mutation<
      TUser,
      Pick<TUser, 'first_name' | 'second_name' | 'display_name' | 'login' | 'phone' | 'email'>
    >({
      query: body => ({
        url: 'user/profile',
        method: 'PUT',
        body,
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getUser'],
    }),
    changePassword: build.mutation<TUser, TChangePasswordData>({
      query: body => ({
        url: 'user/password',
        method: 'PUT',
        body,
        ...commonFetchArgs,
      }),
      invalidatesTags: ['getUser'],
    }),
  }),
});

export const { useGetUserQuery, useUpdateProfileMutation, useUpdateAvatarMutation, useChangePasswordMutation } =
  userApi;
