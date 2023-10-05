import { UserType } from '@/components/types'
import { createContext } from 'react'

const UserContext = createContext<{
  user?: UserType | null
  setUser?: React.Dispatch<React.SetStateAction<UserType>> | null
}>({})

export default UserContext
