import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'

export const BackButton = () => {
  const navigate = useNavigate()

  const navigateHandler = () => {
    navigate(-1)
  }

  return (
    <div onClick={navigateHandler} className={style.backButton}>
      <img src="./src/assets/backArrow.svg" />
    </div>
  )
}
