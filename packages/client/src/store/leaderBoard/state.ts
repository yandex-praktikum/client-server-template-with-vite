import { TLeaderBoardItem } from '../../api/types'

export type TLeaderBoardSlice = {
  isError: boolean
  isLoading: boolean
  errorMessage: string
  data: TLeaderBoardItem[]
}

export const initialState: TLeaderBoardSlice = {
  isError: false,
  isLoading: false,
  errorMessage: '',
  data: [],
}
