import React from 'react'
import { UserFormLinkButton } from '../UserFormLinkButton'
import style from './index.module.scss'

type TUserProfileButtonBlock = {
  logOutCallback: () => void
  userDataChangeCallback: () => void
  passwordChangeCallback: () => void
}

export const UserProfileButtonBlock = ({
  logOutCallback,
  passwordChangeCallback,
  userDataChangeCallback,
}: TUserProfileButtonBlock) => {
  return (
    <div className={style.button_wrapper}>
      <UserFormLinkButton
        text="Изменить данные"
        callback={userDataChangeCallback}
      />
      <UserFormLinkButton
        text="Изменить пароль"
        callback={passwordChangeCallback}
      />
      <UserFormLinkButton
        text="Выйти"
        callback={logOutCallback}
        isNoBorder
        className={style.red_text}
      />
    </div>
  )
}
