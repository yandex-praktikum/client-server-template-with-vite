import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'

export const BackButton = () => {
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate(-1)
  }

  return (
    <div onClick={navigateHandler} className={style.back_button}>
      <svg
        width="33"
        height="24"
        viewBox="0 0 33 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.939278 10.9393C0.353491 11.5251 0.353491 12.4749 0.939278 13.0607L10.4852 22.6066C11.071 23.1924 12.0208 23.1924 12.6065 22.6066C13.1923 22.0208 13.1923 21.0711 12.6065 20.4853L4.12126 12L12.6065 3.51472C13.1923 2.92893 13.1923 1.97919 12.6065 1.3934C12.0208 0.807611 11.071 0.807611 10.4852 1.3934L0.939278 10.9393ZM32.0166 10.5H1.99994V13.5H32.0166V10.5Z"
          fill="white"
        />
      </svg>
    </div>
  )
}
