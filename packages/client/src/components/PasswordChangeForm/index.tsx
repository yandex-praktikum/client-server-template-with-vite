import React from 'react'
import { Form, Formik } from 'formik'
import { TUserPassword } from '../../api/types'
import { validate } from '../../utils/validator'
import { UserProfileFormInput } from '../UserProfileFormInput'
import { UserProfileSaveButton } from '../UserProfileSaveButton'
import style from './index.module.scss'

type TPasswordChangeForm = {
  isDisable: boolean
  onsubmit: (values: TUserPassword) => void
  className?: string
}

export const PasswordChangeForm = ({
  onsubmit,
  isDisable,
  className = '',
}: TPasswordChangeForm) => {
  return (
    <div className={`${style.userFormWrapper} ${className}`}>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          repeatNewPassword: '',
        }}
        validate={validate}
        onSubmit={onsubmit}>
        {({ values }) => (
          <Form className={style.userForm}>
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
            <div className={style.submitButtonWrapper}>
              <UserProfileSaveButton className={style.saveButton} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
