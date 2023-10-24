import React from 'react'
import style from './index.module.scss'

type TErrorMessage = {
  text: string
  className?: string
}

export const ErrorMessage = ({ text, className = '' }: TErrorMessage) => (
  <p className={`${style.error_message} ${className}`}>{text}</p>
)
