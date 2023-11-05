import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, TUserSlice } from './state'
import { getUser } from './actions'

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
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'rejected'
        if (action.error.message) {
          state.error = action.error.message
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'received'
        state.user = action.payload
      })
  },
})

export const { setIsAuth, setIsDataFetched } = userSlice.actions
export default userSlice.reducer
