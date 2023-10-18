import React from 'react'
import styles from './index.module.scss'

type TFormHeader = {
  text: string
  className?: string
}

export const FormHeader = ({ text, className = '' }: TFormHeader) => {
  return (
    <h1 className={`${styles.form_header} ${styles.font_20} ${className}`}>
      {text}
    </h1>
  )
}
