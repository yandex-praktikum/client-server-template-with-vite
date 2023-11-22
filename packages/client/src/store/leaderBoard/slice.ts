import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TLeaderBoardItem } from '../../api/types'
import { getLeaderBoardThunk } from './dispatchers'
import { initialState, TLeaderBoardSlice } from './state'

const pendingState = (state: TLeaderBoardSlice) => {
  state.isError = false
  state.isLoading = true
}

const rejectedState = (
  state: TLeaderBoardSlice,
  action: PayloadAction<string | undefined>
) => {
  state.isError = true
  state.isLoading = false
  state.errorMessage = action.payload || ''
}

export const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLeaderBoardData(
      state: TLeaderBoardSlice,
      action: PayloadAction<TLeaderBoardItem[]>
    ) {
      state.data = action.payload
    },
    setNewScore(state: TLeaderBoardSlice, action: PayloadAction<string>) {
      state.newScore = action.payload.replace(/\D/g, '')
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
          console.log(action.payload)
          state.isLoading = false
          state.data = action.payload
        }
      )
    builder.addCase(getLeaderBoardThunk.rejected, rejectedState)
  },
})

export const leaderBoardReducer = leaderBoardSlice.reducer
export const { setLeaderBoardData, setNewScore } = leaderBoardSlice.actions
