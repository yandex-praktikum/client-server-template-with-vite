import React, { useEffect } from 'react'
import { getUserData } from '../../store/user/selectors'
import { UserAvatar } from '../../components/UserAvatar'
import { TUserData, TUserPassword } from '../../api/types'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { UserProfileFormTemplate } from '../../components/UserProfileFormTemplate'
import {
  setUserAvatar,
  changeUserData,
  getUserDataThunk,
  changeUserPassword,
} from '../../store/user/dispatchecrs'
import style from './index.module.scss'

type TUserProfilePage = {
  logoutCallback: () => void
}

const UserProfilePage = ({ logoutCallback }: TUserProfilePage) => {
  const dispatch = useAppDispatch()
  const userState = useAppSelector(getUserData)
  const { user, isError, errorMessage } = userState

  useEffect(() => {
    if (!user.id) {
      dispatch(getUserDataThunk())
    }
  }, [dispatch])

  const changeAvatarHandler = (data: FormData) => {
    dispatch(setUserAvatar(data))
  }

  const changeUserDataHandler = (data: TUserData) => {
    dispatch(changeUserData(data))
  }

  const changeUserPasswordHandler = (data: TUserPassword) => {
    dispatch(changeUserPassword(data))
  }

  return (
    <div className={style.settingsPageWrapper}>
      <UserAvatar
        isError={isError}
        url={user.avatar}
        errorMessage={errorMessage}
        changeAvatarHandler={changeAvatarHandler}
        className={style.userAvatarMargin}
      />
      <UserProfileFormTemplate
        userData={userState}
        logout={logoutCallback}
        changeUserDataHandler={changeUserDataHandler}
        changeUserPasswordHandler={changeUserPasswordHandler}
      />
    </div>
  )
}

export default UserProfilePage
