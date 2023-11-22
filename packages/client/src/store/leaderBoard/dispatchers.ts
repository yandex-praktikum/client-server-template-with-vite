import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { TeamName } from '../../const/api'
import { leaderBoardApi } from '../../api/liderBoardApi'
import { TLeaderBoardItem, TRejectWithValue } from '../../api/types'

export const getAllLeaderBoardItemThunk = createAsyncThunk(
  '/getAllLeaderBoardItem',
  (_, { rejectWithValue }) => {
    return leaderBoardApi
      .getAllLeaderBoardItems()
      .then(response => response.data)
      .catch(error => rejectWithValue(error.response.reason))
  }
)

export const getLeaderBoardThunk = createAsyncThunk<
  TLeaderBoardItem[],
  void,
  TRejectWithValue
>('leaderBoard/getLeaderBoardThunk', (userName, { rejectWithValue }) => {
  return leaderBoardApi
    .getLeaderBoard(TeamName)
    .then(response => response.data.map(item => item.data))
    .catch(error => rejectWithValue(error.response.data.reason))
})

export const addNewUserToLeadBoard = createAsyncThunk<
  any,
  number,
  { state: RootState; rejectValue: TRejectWithValue }
>(
  'leaderBoard/addNewUserToLeadBoard',
  (score, { getState, dispatch, rejectWithValue }) => {
    const {
      user: { display_name, first_name, second_name, avatar },
    } = getState().user

    const dataToSend = {
      name: display_name || first_name || second_name,
      score: score,
      avatar: avatar || '',
    }

    const requestData = {
      data: dataToSend,
      ratingFieldName: 'score',
      teamName: TeamName,
    }
    return leaderBoardApi
      .setUserDataToLeaderBoard(requestData)
      .then(response => {
        dispatch(getLeaderBoardThunk())
        return response.data
      })
      .catch(error => rejectWithValue(error.response.data.reason))
  }
)
