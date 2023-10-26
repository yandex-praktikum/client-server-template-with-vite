import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormikValues } from 'formik'
import { userApi } from '../../api/userApi'
import { authApi } from '../../api/authApi'
import { ROUTES_NAMES } from '../../const/routeNames'
import { UserAvatar } from '../../components/UserAvatar'
import { TUserData, TUserPassword } from '../../api/types'
import { initialData, USER_PROFILE_ERRORS_TEXT } from '../../const/userProfile'
import { UserProfileFormTemplate } from '../../components/UserProfileFormTemplate'
import style from './index.module.scss'

type TUserProfilePage = {
  logoutCallback: () => void
}

const UserProfilePage = ({ logoutCallback }: TUserProfilePage) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<TUserData>(initialData)

  useEffect(() => {
    if (!userData.id) {
      authApi
        .getUserData()
        .then(response => {
          setUserData(response.data)
        })
        .catch(() => {
          navigate(ROUTES_NAMES.SIGN_IN)
        })
    }
  }, [userData.id])

  const changeAvatarHandler = (data: FormData): Promise<string> => {
    return userApi
      .setNewAvatarData(data)
      .then(response => {
        setUserData(response.data)
        return ''
      })
      .catch(error => {
        return (
          error.response?.data?.reason || USER_PROFILE_ERRORS_TEXT.UNKNOWN_ERROR
        )
      })
  }

  const changeUserDataHandler = (data: FormikValues) => {
    return userApi
      .changeUserProfileData(data as TUserData)
      .then(response => {
        setUserData(response.data)
        return ''
      })
      .catch(error => {
        return (
          error.response?.data?.reason || USER_PROFILE_ERRORS_TEXT.UNKNOWN_ERROR
        )
      })
  }

  const changeUserPasswordHandler = (data: TUserPassword): Promise<string> => {
    return userApi
      .changeUserPasswordData(data)
      .then(response => {
        console.log(response.data)
        return ''
      })
      .catch(error => {
        return (
          error.response?.data?.reason || USER_PROFILE_ERRORS_TEXT.UNKNOWN_ERROR
        )
      })
  }

  return (
    <div className={style.settingsPageWrapper}>
      <UserAvatar
        url={userData.avatar}
        changeAvatarHandler={changeAvatarHandler}
        className={style.userAvatarMargin}
      />
      <UserProfileFormTemplate
        userData={userData}
        logout={logoutCallback}
        changeUserDataHandler={changeUserDataHandler}
        changeUserPasswordHandler={changeUserPasswordHandler}
      />
    </div>
  )
}

export default UserProfilePage
