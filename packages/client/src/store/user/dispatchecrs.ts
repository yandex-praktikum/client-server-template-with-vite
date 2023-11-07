import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/authApi'
import { userApi } from '../../api/userApi'
import {
  TUserData,
  TUserPassword,
  TRejectWithValue,
  TSignInRequestData,
  TSignupRequestData,
} from '../../api/types'

export const login = createAsyncThunk<
  void,
  TSignInRequestData,
  TRejectWithValue
>('user/login', (data, { dispatch, rejectWithValue }) => {
  return authApi
    .login(data)
    .then(() => {
      dispatch(getUserDataThunk())
    })
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const signup = createAsyncThunk<
  void,
  TSignupRequestData,
  TRejectWithValue
>('user/signup', (data, { dispatch, rejectWithValue }) => {
  return authApi
    .signup(data)
    .then(() => {
      dispatch(getUserDataThunk())
    })
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const getUserDataThunk = createAsyncThunk<
  TUserData,
  void,
  TRejectWithValue
>('user/getUserDataThunk', (data, { rejectWithValue }) => {
  return authApi
    .getUserData()
    .then(response => response.data)
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const changeUserData = createAsyncThunk<
  TUserData,
  TUserData,
  TRejectWithValue
>('user/changeUserData', (data, { rejectWithValue }) => {
  return userApi
    .changeUserProfileData(data)
    .then(response => response.data)
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const changeUserPassword = createAsyncThunk<
  TUserData,
  TUserPassword,
  TRejectWithValue
>('user/changeUserPassword', (data, { rejectWithValue }) => {
  return userApi
    .changeUserPasswordData(data)
    .then(response => response.data)
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const setUserAvatar = createAsyncThunk<
  TUserData,
  FormData,
  TRejectWithValue
>('user/setUserAvatar', (data, { rejectWithValue }) => {
  return userApi
    .setNewAvatarData(data)
    .then(response => response.data)
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const logout = createAsyncThunk('user/logout', () => {
  return authApi.logout().then()
})
