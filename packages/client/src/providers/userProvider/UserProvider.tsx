import React, { ReactNode } from 'react'
import UserContext from './UserContext'
import { UserType } from '@components/types'
import { baseApiUrl } from '@/api/api'
import { DEFAULT_AVATAR } from '@/utils/constants'

interface UserContextProps {
  children?: ReactNode
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
}

const resourcesUrl = baseApiUrl + 'resources'
export const UserContextProvider = ({
  user,
  children,
  setUser,
}: UserContextProps) => {
  const userAvatar = user.avatar
    ? user.avatar.startsWith('/')
      ? resourcesUrl + user.avatar
      : user.avatar
    : DEFAULT_AVATAR

  return (
    <UserContext.Provider
      value={{ user: { ...user, avatar: userAvatar }, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
