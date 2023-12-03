import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrowUrl from '../../assets/arrow.svg'
import s from './index.module.scss'

const GoBack = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button className={s.link} onClick={handleClick}>
      <img className={s.img} src={arrowUrl} alt="Вернуться" />
    </button>
  )
}

export default GoBack
