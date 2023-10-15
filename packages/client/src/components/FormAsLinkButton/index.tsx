import React from 'react'
import styles from './index.module.scss'

type TFormAsLinkButton = {
  disabled: boolean
  buttonType: 'button' | 'submit' | 'reset' | undefined
  buttonText: string
  onClickCallback?: () => void
  className?: string
}

export const FormAsLinkButton = ({
  buttonText,
  buttonType,
  onClickCallback,
  disabled,
  className,
}: TFormAsLinkButton) => {
  return (
    <button
      type={buttonType}
      disabled={disabled}
      onClick={onClickCallback}
      className={`${className} ${styles.link} ${styles.font_13}`}>
      {buttonText}
    </button>
  )
}
