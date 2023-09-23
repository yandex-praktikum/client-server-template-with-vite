import React, { ReactNode } from 'react'
import { UserContext } from './UserContext'
import { UserType } from '@components/types'

interface UserContextProps {
  children?: ReactNode
  user: UserType
}

export const UserContextProvider = ({ user, children }: UserContextProps) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
