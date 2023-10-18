import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

type TFormAsLinkButton = {
  to: string
  buttonText: string
  onClickCallback?: () => void
  className?: string
}

export const FormLinkButton = ({
  to,
  buttonText,
  onClickCallback,
  className,
}: TFormAsLinkButton) => {
  return (
    <Link
      to={to}
      onClick={onClickCallback}
      className={`${className} ${styles.link} ${styles.font_13}`}>
      {buttonText}
    </Link>
  )
}
