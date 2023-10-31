import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import { getUser } from './actions'

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

export default userSlice.reducer
