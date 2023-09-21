import { createContext } from 'react'

export type UserContextType = {
  avatar?: string
  first_name?: string
  second_name?: string
  phone?: string
  login: string
  email: string
}

export const UserContext = createContext<UserContextType>({} as UserContextType)
