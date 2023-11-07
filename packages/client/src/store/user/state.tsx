import { TUserData } from '../../api/types'

export type Status = 'idle' | 'loading' | 'rejected' | 'received'

export type TUserSlice = {
  isAuth: boolean
  isDataFetched: boolean
  isError: boolean
  isLoading: boolean
  errorMessage: string
  user: TUserData
  status: Status
  error: string | null
}

export const initialState: TUserSlice = {
  isAuth: false,
  isDataFetched: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
  user: {
    id: 0,
    first_name: '',
    second_name: '',
    phone: '',
    login: '',
    email: '',
    display_name: '',
    avatar: '',
  },
  status: 'idle',
  error: null,
}
