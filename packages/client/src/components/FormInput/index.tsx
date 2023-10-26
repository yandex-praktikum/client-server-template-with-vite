import React from 'react'
import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from 'formik'
import styles from './index.module.scss'

type TFormInput = {
  id: string
  name: string
  type: string
  labelText: string
  placeholder: string
  touched?: FormikTouched<FormikValues>
  errors?: FormikErrors<FormikValues>
  className?: string
}

export const FormInput = ({
  id,
  name,
  type,
  labelText,
  placeholder,
  touched = {},
  errors = {},
  className = '',
}: TFormInput) => {
  return (
    <div className={`${styles.formInputBlockWrapper} ${className}`}>
      <label htmlFor={id} className={`${styles.formLabel} ${styles.font_18}`}>
        {labelText}
      </label>
      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.formInput} ${styles.font_24} ${
          touched[name] && errors[name] ? 'error-input' : ''
        }`}
      />
      <ErrorMessage
        component="p"
        name={name}
        className={`form-error-message ${styles.font_8}`}
      />
    </div>
  )
}
