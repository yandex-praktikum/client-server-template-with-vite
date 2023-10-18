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
      className={`${className} ${styles.button} ${styles.form_button}`}>
      {buttonText}
    </button>
  )
}
