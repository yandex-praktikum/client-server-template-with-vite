import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUserData } from '../../api/types'
import { initialData } from '../../const/userProfile'

const initialState = {
  user: initialData,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserData>) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
