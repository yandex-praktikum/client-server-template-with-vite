import React from 'react'
import { Field } from 'formik'
import styles from './index.module.scss'

type TFormInput = {
  id: string
  name: string
  type: string
  labelText: string
  placeholder: string
  className?: string
}

export const FormInput = ({
  id,
  name,
  type,
  labelText,
  placeholder,
  className = '',
}: TFormInput) => {
  return (
    <div className={`${styles.form_input_block_wrapper} ${className}`}>
      <label htmlFor={id} className={`${styles.form_label} ${styles.font_18}`}>
        {labelText}
      </label>
      <Field
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.form_input} ${styles.font_24}`}
      />
    </div>
  )
}
