import { TUserData } from '../../api/types'

export type Status = 'idle' | 'loading' | 'rejected' | 'received'

type userSlice = {
  user: TUserData
  status: Status
  error: string | null
}

export const initialState: userSlice = {
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
