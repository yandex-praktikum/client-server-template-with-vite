import React from 'react'
import { Form, Formik } from 'formik'
import { TUserPassword } from '../../api/types'
import { validate } from '../../utils/validator'
import { UserProfileFormInput } from '../UserProfileFormInput'
import { UserProfileSaveButton } from '../UserProfileSaveButton'
import style from '../userProfileForm/index.module.scss'

type TPasswordChangeForm = {
  isDisable: boolean
  onsubmitCallback: (values: TUserPassword) => void
  className?: string
}

export const PasswordChangeForm = ({
  isDisable,
  onsubmitCallback,
  className = '',
}: TPasswordChangeForm) => {
  return (
    <div className={`${style.user_form_wrapper} ${className}`}>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        }}
        validate={validate}
        onSubmit={onsubmitCallback}>
        {({ values }) => (
          <Form className={style.user_form}>
            <UserProfileFormInput
              id="oldPassword"
              type="password"
              name="oldPassword"
              labelText="Старый пароль"
              isDisabled={isDisable}
              value={values['oldPassword']}
              placeholder="Введите старый пароль"
            />
            <UserProfileFormInput
              id="newPassword"
              type="password"
              name="newPassword"
              labelText="Новый пароль"
              isDisabled={isDisable}
              value={values['newPassword']}
              placeholder="Введите новый пароль"
            />
            <UserProfileFormInput
              id="repeatNewPassword"
              type="password"
              name="repeatNewPassword"
              labelText="Повторите новый пароль"
              isDisabled={isDisable}
              value={values['repeatNewPassword']}
              placeholder="Повторите новый пароль"
            />
            <div className={style.submit_button_wrapper}>
              <UserProfileSaveButton className={style.save_button} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
