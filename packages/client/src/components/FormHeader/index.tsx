import React from 'react'
import styles from './index.module.scss'

type TFormHeader = {
  text: string
  className?: string
}

export const FormHeader = ({ text, className = '' }: TFormHeader) => {
  return (
    <h1 className={`${styles.formHeader} ${styles.font_26} ${className}`}>
      {text}
    </h1>
  )
}
