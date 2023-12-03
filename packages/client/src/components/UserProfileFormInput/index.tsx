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
  labelText: string
  placeholder: string
  isDisabled: boolean
  value?: string
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
  value,
  placeholder,
  touched = {},
  errors = {},
  className = '',
}: TUserProfileFormInput) => {
  return (
    <div className={`${styles.useFormInputBlockWrapper} ${className}`}>
      <label
        htmlFor={id}
        className={`${styles.userFormLabel} ${styles.font_13}`}>
        {labelText}
      </label>
      <div className={styles.userFormInputWrapper}>
        <Field
          id={id}
          name={name}
          type={type}
          value={value ?? ''}
          disabled={isDisabled}
          placeholder={placeholder}
          className={`${styles.userFormInput} ${styles.font_14} ${
            touched[name] && errors[name] ? 'error-input' : ''
          }`}
        />
        <ErrorMessage
          component="p"
          name={name}
          className={`form-error-message ${styles.font_8}`}
        />
      </div>
    </div>
  )
}
