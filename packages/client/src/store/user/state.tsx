import { TUserData } from '../../api/types'

type userSlice = {
  user: TUserData
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
}
