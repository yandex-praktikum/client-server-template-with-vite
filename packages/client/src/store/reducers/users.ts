import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    addUser(state, action: PayloadAction<any>) {
      state.users.push(action.payload)
    },
  },
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
