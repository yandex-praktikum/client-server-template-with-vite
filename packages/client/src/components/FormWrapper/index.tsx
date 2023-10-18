import React from 'react'
import styles from './index.module.scss'

type TFormWrapper = {
  children: React.ReactNode
  className?: string
}

export const FormWrapper = ({ children, className }: TFormWrapper) => {
  return <div className={`${styles.form_wrapper} ${className}`}>{children}</div>
}
