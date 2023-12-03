import { useState } from 'react'

import { authApi } from '../../api/authApi'
import { generateYandexOAuthUrl } from '../../utils/helpers'
import styles from './index.module.scss'

export const YandexAuth = () => {
  const [error, setError] = useState('')

  const handleClick = async () => {
    try {
      const response = await authApi.getOAuthInformation()
      if (response.data.service_id) {
        window.location.href = generateYandexOAuthUrl(response.data.service_id)
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }

      throw error
    }
  }

  return (
    <>
      <button
        type="button"
        className={`${styles.font_24} form-button`}
        onClick={handleClick}>
        Яндекс логин
      </button>
      {error && (
        <span className={`${styles.error} ${styles.font_14}`}>{error}</span>
      )}
    </>
  )
}
