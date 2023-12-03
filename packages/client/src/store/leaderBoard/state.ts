import { TLeaderBoardItem } from '../../api/types'

export type TLeaderBoardSlice = {
  isError: boolean
  isLoading: boolean
  errorMessage: string
  newScore: string
  data: TLeaderBoardItem[]
}

export const initialState: TLeaderBoardSlice = {
  isError: false,
  isLoading: false,
  errorMessage: '',
  newScore: '',
  data: [],
}
