import React from 'react'
import s from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const GoBack = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button className={s.link} onClick={handleClick}>
      <img className={s.img} src="src/assets/arrow.svg" alt="arrow" />
    </button>
  )
}

export default GoBack
