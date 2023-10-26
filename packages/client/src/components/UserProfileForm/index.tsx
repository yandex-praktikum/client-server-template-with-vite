import React from 'react'
import { Form, Formik, FormikValues } from 'formik'
import { TUserData } from '../../api/types'
import { validate } from '../../utils/validator'
import { UserProfileFormInput } from '../UserProfileFormInput'
import { UserProfileSaveButton } from '../UserProfileSaveButton'
import style from './index.module.scss'

type TUserProfileForm = {
  isDisable: boolean
  userData: TUserData
  onsubmitCallback: (values: FormikValues) => void
  className?: string
}

export const UserProfileForm = ({
  userData,
  isDisable,
  onsubmitCallback,
  className = '',
}: TUserProfileForm) => {
  return (
    <div className={`${style.user_form_wrapper} ${className}`}>
      <Formik
        enableReinitialize={true}
        initialValues={userData}
        validate={validate}
        onSubmit={onsubmitCallback}>
        {({ values }) => (
          <Form className={style.user_form}>
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
              className={style.input_block_without_border}
            />
            {!isDisable ? (
              <div className={style.submit_button_wrapper}>
                <UserProfileSaveButton className={style.save_button} />
              </div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  )
}
