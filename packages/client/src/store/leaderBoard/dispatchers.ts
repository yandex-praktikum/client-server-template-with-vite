import { createAsyncThunk } from '@reduxjs/toolkit'
import { TeamName } from '../../const/api'
import { leaderBoardApi } from '../../api/liderBoardApi'
import {
  TLeaderBoardItem,
  TLeaderBoardNewLeaderRequestData,
  TRejectWithValue,
} from '../../api/types'

export const getLeaderBoardThunk = createAsyncThunk<
  TLeaderBoardItem[],
  void,
  TRejectWithValue
>('leaderBoard/getLeaderBoardThunk', (_, { rejectWithValue }) => {
  return leaderBoardApi
    .getLeaderBoard(TeamName)
    .then(response => response.data.sort((a, b) => a.score - b.score))
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const addNewUserToLeadBoard = createAsyncThunk<
  any,
  TLeaderBoardNewLeaderRequestData,
  TRejectWithValue
>('/', (data, { rejectWithValue }) => {
  return leaderBoardApi
    .setUserDataToLeaderBoard(data)
    .then(response => response.data)
    .catch(error => rejectWithValue(error.response.data.reason))
})
