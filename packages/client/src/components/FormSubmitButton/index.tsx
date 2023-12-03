import React from 'react'
import styles from './index.module.scss'

type TFormSubmitButton = {
  disabled: boolean
  buttonType: 'button' | 'submit' | 'reset' | undefined
  buttonText: string
  onClickCallback?: () => void
  className?: string
}

export const FormSubmitButton = ({
  buttonType,
  buttonText,
  disabled,
  onClickCallback,
  className = '',
}: TFormSubmitButton) => {
  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClickCallback}
      className={`button form-button ${className} ${styles.font_24}`}>
      {buttonText}
    </button>
  )
}
