import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import { authApi } from '../../api/authApi'

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await authApi.getUserData()
  const data = await response.data
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.payload as string
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'received'
        state.user = action.payload
      })
  },
})

export default userSlice.reducer
