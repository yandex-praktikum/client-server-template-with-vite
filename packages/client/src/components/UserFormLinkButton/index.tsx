import React from 'react'
import style from './index.module.scss'

type TUserFormLinkButton = {
  text: string
  isNoBorder?: boolean
  callback: () => void
  className?: string
}

export const UserFormLinkButton = ({
  text,
  callback,
  isNoBorder = false,
  className = '',
}: TUserFormLinkButton) => {
  return (
    <div
      className={`block-wrapper block-wrapper-link ${
        isNoBorder ? '' : 'block-wrapper-border'
      }`}>
      <button
        onClick={callback}
        className={`${style.button} ${style.linkButton} ${style.font_13} ${className}`}>
        {text}
      </button>
    </div>
  )
}
