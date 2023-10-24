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
  logoutCallback: () => void
  changeUserDataHandler: (data: FormikValues) => Promise<string>
  changeUserPasswordHandler: (data: TUserPassword) => Promise<string>
}

export const UserProfileFormTemplate = ({
  userData,
  logoutCallback,
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

    if (!result) {
      disableEditMode()
    }
    if (result) {
      setError(result)
    }
  }

  return (
    <div className={style.profile_wrapper}>
      <div className={style.user_name_wrapper}>
        <span className={`${style.user_name_text} ${style.font_18}`}>
          {first_name}
        </span>
        <span className={`${style.user_name_text} ${style.font_18}`}>
          {second_name}
        </span>
      </div>
      {error ? (
        <ErrorMessage text={error} className="error_message_margin" />
      ) : null}
      {isPasswordEdit ? (
        <PasswordChangeForm
          isDisable={!isPasswordEdit}
          onsubmitCallback={changeUserPassword}
          className={style.user_profile_form_margin}
        />
      ) : (
        <UserProfileForm
          userData={userData}
          isDisable={!isEdit}
          onsubmitCallback={changeUserData}
          className={style.user_profile_form_margin}
        />
      )}
      {!hideButtons ? (
        <UserProfileButtonBlock
          logOutCallback={logoutCallback}
          userDataChangeCallback={userDataEditToggle}
          passwordChangeCallback={passwordChangeToggle}
        />
      ) : null}
    </div>
  )
}
