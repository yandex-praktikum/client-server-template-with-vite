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
      className={`block-wrapper block-wrapper_link ${
        isNoBorder ? '' : 'block_wrapper_border'
      }`}>
      <button
        onClick={callback}
        className={`${style.button} ${style.link_button} ${style.font_13} ${className}`}>
        {text}
      </button>
    </div>
  )
}
