import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLeaderBoardThunk } from './dispatchers'
import { initialState, TLeaderBoardSlice } from './state'
import { TGetLeaderBoardResponse, TLeaderBoardItem } from '../../api/types'

const pendingState = (state: TLeaderBoardSlice) => {
  state.isError = false
  state.isLoading = true
}

const rejectedState = (
  state: TLeaderBoardSlice,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false
  state.isError = true
  state.errorMessage = action.payload || ''
}

export const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLeaderBoardData(
      state: TLeaderBoardSlice,
      action: PayloadAction<TGetLeaderBoardResponse>
    ) {
      state.data = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLeaderBoardThunk.pending, pendingState)
      .addCase(
        getLeaderBoardThunk.fulfilled,
        (
          state: TLeaderBoardSlice,
          action: PayloadAction<TLeaderBoardItem[]>
        ) => {
          state.isLoading = false
          state.data = action.payload
        }
      )
      .addCase(getLeaderBoardThunk.rejected, rejectedState)
  },
})

export const leaderBoardReducer = leaderBoardSlice.reducer
export const { setLeaderBoardData } = leaderBoardSlice.actions
