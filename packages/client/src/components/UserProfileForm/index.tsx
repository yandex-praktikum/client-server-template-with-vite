import React from 'react'
import { Form, Formik } from 'formik'
import { TUserData } from '../../api/types'
import { validate } from '../../utils/validator'
import { UserProfileFormInput } from '../UserProfileFormInput'
import { UserProfileSaveButton } from '../UserProfileSaveButton'
import style from './index.module.scss'

type TUserProfileForm = {
  isDisable: boolean
  userData: TUserData
  onsubmit: (values: TUserData) => void
  className?: string
}

export const UserProfileForm = ({
  userData,
  isDisable,
  onsubmit,
  className = '',
}: TUserProfileForm) => {
  return (
    <div className={`${style.userFormWrapper} ${className}`}>
      <Formik
        enableReinitialize={true}
        initialValues={userData}
        validate={validate}
        onSubmit={onsubmit}>
        {({ values }) => (
          <Form className={style.userForm}>
            <UserProfileFormInput
              id="email"
              type="text"
              name="email"
              value={values['email']}
              labelText="Почта"
              isDisabled={isDisable}
              placeholder="Введите почту"
            />
            <UserProfileFormInput
              id="login"
              type="text"
              name="login"
              value={values['login']}
              labelText="Логин"
              isDisabled={isDisable}
              placeholder="Введите логин"
            />
            <UserProfileFormInput
              id="first_name"
              type="text"
              name="first_name"
              labelText="Имя"
              value={values['first_name']}
              isDisabled={isDisable}
              placeholder="Введите Имя"
            />
            <UserProfileFormInput
              id="second_name"
              type="text"
              name="second_name"
              labelText="Фамилия"
              value={values['second_name']}
              isDisabled={isDisable}
              placeholder="Введите фамилию"
            />
            <UserProfileFormInput
              id="display_name"
              type="text"
              name="display_name"
              labelText="Имя в чате"
              value={values['display_name']}
              isDisabled={isDisable}
              placeholder="Введите имя в чате"
            />
            <UserProfileFormInput
              id="phone"
              type="text"
              name="phone"
              labelText="Телефон"
              value={values['phone']}
              isDisabled={isDisable}
              placeholder="Введите телефон"
              className={style.inputBlockWithoutBorder}
            />
            {!isDisable ? (
              <div className={style.submitButtonWrapper}>
                <UserProfileSaveButton className={style.save_button} />
              </div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  )
}
