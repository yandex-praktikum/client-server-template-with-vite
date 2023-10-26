import React, { useState } from 'react'
import { FormikValues } from 'formik'
import { ErrorMessage } from '../ErrorMessage'
import { UserProfileForm } from '../UserProfileForm'
import { TUserData, TUserPassword } from '../../api/types'
import { PasswordChangeForm } from '../PasswordChangeForm'
import { USER_PROFILE_ERRORS_TEXT } from '../../const/userProfile'
import { UserProfileButtonBlock } from '../UserProfileButtonBlock'
import style from './index.module.scss'

type TUserProfileFormTemplate = {
  userData: TUserData
  logout: () => void
  changeUserDataHandler: (data: FormikValues) => Promise<string>
  changeUserPasswordHandler: (data: TUserPassword) => Promise<string>
}

export const UserProfileFormTemplate = ({
  logout,
  userData,
  changeUserDataHandler,
  changeUserPasswordHandler,
}: TUserProfileFormTemplate) => {
  const [isEdit, setIsEdit] = useState(false)
  const [hideButtons, setHideButtons] = useState(false)
  const [isPasswordEdit, setIsPasswordEdit] = useState(false)
  const [error, setError] = useState('')

  const { first_name, second_name } = userData

  const userDataEditToggle = () => {
    setHideButtons(true)
    setIsEdit(prevState => !prevState)
  }

  const passwordChangeToggle = () => {
    setHideButtons(true)
    setIsPasswordEdit(prevState => !prevState)
  }

  const disableEditMode = () => {
    setIsEdit(false)
    setHideButtons(false)
    setIsPasswordEdit(false)
  }

  const changeUserData = async (values: FormikValues) => {
    setError('')

    const result = await changeUserDataHandler(values)

    if (!result) {
      disableEditMode()
    }
    if (result) {
      setError(result)
    }
  }

  const changeUserPassword = async (values: TUserPassword) => {
    const { newPassword, repeatNewPassword } = values

    if (newPassword !== repeatNewPassword) {
      setError(USER_PROFILE_ERRORS_TEXT.PASSWORD_NOT_SAME)
      return
    }

    setError('')
    const result = await changeUserPasswordHandler(values)

    if (result) {
      setError(result)
    } else {
      disableEditMode()
    }
  }

  return (
    <div className={style.profileWrapper}>
      <div className={style.userNameWrapper}>
        <span className={`${style.userNameText} ${style.font_18}`}>
          {first_name}
        </span>
        <span className={`${style.userNameText} ${style.font_18}`}>
          {second_name}
        </span>
      </div>
      {error ? (
        <ErrorMessage text={error} className="error-message-margin" />
      ) : null}
      {isPasswordEdit ? (
        <PasswordChangeForm
          isDisable={!isPasswordEdit}
          onsubmit={changeUserPassword}
          className={style.userProfileFormMargin}
        />
      ) : (
        <UserProfileForm
          userData={userData}
          isDisable={!isEdit}
          onsubmit={changeUserData}
          className={style.userProfileFormMargin}
        />
      )}
      {!hideButtons ? (
        <UserProfileButtonBlock
          logOut={logout}
          userDataChange={userDataEditToggle}
          passwordChange={passwordChangeToggle}
        />
      ) : null}
    </div>
  )
}
