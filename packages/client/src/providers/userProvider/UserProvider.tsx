import React, { ReactNode } from 'react'
import UserContext from './UserContext'
import { UserType } from '@components/types'

interface UserContextProps {
  children?: ReactNode
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
}

export const UserContextProvider = ({
  user,
  children,
  setUser,
}: UserContextProps) => {
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
