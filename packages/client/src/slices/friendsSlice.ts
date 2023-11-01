import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SERVER_HOST } from '../constants'

interface Friend {
  name: string
  secondName: string
  avatar: string
}

export interface FriendsState {
  data: Array<Friend>
  isLoading: boolean
}

const initialState: FriendsState = {
  data: [],
  isLoading: false,
}

export const fetchFriendsThunk = createAsyncThunk(
  'user/fetchFriendsThunk',
  async (_: void) => {
    const url = `${SERVER_HOST}/friends`
    return fetch(url).then(res => res.json())
  }
)

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFriendsThunk.pending.type, state => {
        state.data = []
        state.isLoading = true
      })
      .addCase(
        fetchFriendsThunk.fulfilled.type,
        (state, { payload }: PayloadAction<Friend[]>) => {
          state.data = payload
          state.isLoading = false
        }
      )
      .addCase(fetchFriendsThunk.rejected.type, state => {
        state.isLoading = false
      })
  },
})

export const selectFriends = (state: RootState) => state.friends.data

export const selectIsLoadingFriends = (state: RootState) =>
  state.friends.isLoading

export default friendsSlice.reducer
