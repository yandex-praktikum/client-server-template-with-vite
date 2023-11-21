import { axiosInstance } from './axiosInstance'
import { END_POINTS_URL } from '../const/api'
import {
  TGetLeaderBoardResponse,
  TLeaderBoardNewLeaderRequestData,
} from './types'

export const leaderBoardApi = {
  getLeaderBoard(teamName: string) {
    return axiosInstance.post<TGetLeaderBoardResponse>(
      `${END_POINTS_URL.LEADER_BOARD}/${teamName}`,
      {
        ratingFieldName: '',
        cursor: 0,
        limit: 25,
      }
    )
  },
  setUserDataToLeaderBoard(data: TLeaderBoardNewLeaderRequestData) {
    return axiosInstance.post(END_POINTS_URL.LEADER_BOARD, data)
  },
}
