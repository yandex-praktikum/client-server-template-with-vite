import React from 'react'
import {
  Field,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik'
import styles from './index.module.scss'

type TUserProfileFormInput = {
  id: string
  name: string
  type: string
  value?: string
  labelText: string
  placeholder: string
  isDisabled: boolean
  touched?: FormikTouched<FormikValues>
  errors?: FormikErrors<FormikValues>
  className?: string
}

export const UserProfileFormInput = ({
  id,
  name,
  type,
  labelText,
  isDisabled,
  value = '',
  placeholder,
  touched = {},
  errors = {},
  className = '',
}: TUserProfileFormInput) => {
  return (
    <div className={`${styles.user_form_input_block_wrapper} ${className}`}>
      <label
        htmlFor={id}
        className={`${styles.user_form_label} ${styles.font_13}`}>
        {labelText}
      </label>
      <div className={styles.user_form_input_wrapper}>
        <Field
          id={id}
          name={name}
          type={type}
          value={value}
          disabled={isDisabled}
          placeholder={placeholder}
          className={`${styles.user_form_input} ${styles.font_14} ${
            touched[name] && errors[name] ? 'error_input' : ''
          }`}
        />
        <ErrorMessage
          component="p"
          name={name}
          className={`form_error_message ${styles.font_8}`}
        />
      </div>
    </div>
  )
}
