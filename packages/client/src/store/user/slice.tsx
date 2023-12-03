import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, TUserSlice } from './state'
import { getUser } from './actions'
import { TUserData } from '../../api/types'
import {
  login,
  signup,
  setUserAvatar,
  changeUserData,
  getUserDataThunk,
  changeUserPassword,
  logout,
} from './dispatchecrs'
import { API_ERROR_MESSAGES } from '../../const/api'

const pendingState = (state: TUserSlice) => {
  state.isError = false
  state.isLoading = true
}

const rejectedState = (
  state: TUserSlice,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false
  state.isError = true
  state.errorMessage = action.payload || ''
}

const setUserData = (state: TUserSlice, action: PayloadAction<TUserData>) => {
  state.isLoading = false
  state.user = action.payload
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state: TUserSlice, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setIsDataFetched: (state: TUserSlice, action: PayloadAction<boolean>) => {
      state.isDataFetched = action.payload
    },
    setUser: (state: TUserSlice, action: PayloadAction<TUserData>) => {
      state.user = action.payload
    },
    clearError: (state: TUserSlice) => {
      state.isError = false
      state.errorMessage = ''
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, (state: TUserSlice) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUser.rejected, (state: TUserSlice, action: any) => {
        state.status = 'rejected'
        if (action.error.message) {
          state.error = action.error.message
        }
      })
      .addCase(
        getUser.fulfilled,
        (state: TUserSlice, action: PayloadAction<TUserData>) => {
          state.status = 'received'
          state.user = action.payload
        }
      )
      .addCase(getUserDataThunk.pending, pendingState)
      .addCase(getUserDataThunk.rejected, rejectedState)
      .addCase(getUserDataThunk.fulfilled, setUserData)
      .addCase(changeUserData.pending, pendingState)
      .addCase(changeUserData.rejected, rejectedState)
      .addCase(changeUserData.fulfilled, setUserData)
      .addCase(changeUserPassword.pending, pendingState)
      .addCase(changeUserPassword.rejected, rejectedState)
      .addCase(changeUserPassword.fulfilled, (state: TUserSlice) => {
        state.isLoading = false
      })
      .addCase(setUserAvatar.pending, pendingState)
      .addCase(setUserAvatar.rejected, rejectedState)
      .addCase(setUserAvatar.fulfilled, setUserData)
      .addCase(login.pending, pendingState)
      .addCase(login.rejected, rejectedState)
      .addCase(login.fulfilled, (state: TUserSlice) => {
        state.isAuth = true
        state.isLoading = false
      })
      .addCase(signup.pending, pendingState)
      .addCase(signup.rejected, rejectedState)
      .addCase(signup.fulfilled, (state: TUserSlice) => {
        state.isLoading = false
      })
      .addCase(logout.pending, pendingState)
      .addCase(logout.rejected, (state: TUserSlice) => {
        state.isLoading = false
        state.isError = true
        state.errorMessage = API_ERROR_MESSAGES.UNKNOWN_ERROR
      })
      .addCase(logout.fulfilled, (state: TUserSlice) => {
        state.isAuth = false
      })
  },
})

export const { setIsAuth, setIsDataFetched, setUser, clearError } =
  userSlice.actions
export default userSlice.reducer
