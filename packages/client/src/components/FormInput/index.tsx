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
  labelText: string
  placeholder?: string
  as?: string
  type?: string
  touched?: FormikTouched<FormikValues>
  errors?: FormikErrors<FormikValues>
  className?: string
  inputClassName?: string
}

export const FormInput = ({
  id,
  name,
  labelText,
  type,
  placeholder = '',
  as = 'input',
  touched = {},
  errors = {},
  className = '',
  inputClassName = '',
}: TFormInput) => {
  return (
    <div className={`${styles.formInputBlockWrapper} ${className}`}>
      <label htmlFor={id} className={`${styles.formLabel} ${styles.font_18}`}>
        {labelText}
      </label>
      <Field
        id={id}
        as={as}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.formInput} ${styles.font_24} ${
          touched[name] && errors[name] ? 'error-input' : ''
        } ${inputClassName}`}
      />
      <ErrorMessage
        component="p"
        name={name}
        className={`form-error-message ${styles.font_8}`}
      />
    </div>
  )
}
