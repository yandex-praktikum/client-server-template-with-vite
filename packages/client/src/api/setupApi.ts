import axios, { AxiosError, AxiosInstance } from 'axios'
import { urls } from '@/utils/navigation'
import getApiError, { DataErrorType } from './getApiError'

const closePage = ['profile', 'game', 'forum', 'leaderboard']

export const getYandexClientApi = (): AxiosInstance => {
  const apiClient = axios.create()
  const activePage = window.location.pathname.substring(1).split('/')[0]
  apiClient.defaults.baseURL = 'https://ya-praktikum.tech/api/v2/'
  apiClient.defaults.withCredentials = true
  apiClient.defaults.validateStatus = status => status >= 200 && status < 300

  apiClient.interceptors.response.use(
    response => response,
    (error: AxiosError<DataErrorType>) => {
      if (error.response) {
        if (error.response.status === 500) {
          window.location.href = urls.error
        } else if (
          error.response.status === 401 &&
          closePage.indexOf(activePage) !== -1
        ) {
          window.location.href = urls.errorNotFound
        }
        if (error.response.status === 401 && activePage === '') {
          window.location.href = urls.login
        }
        // TODO вывод натификаций в случае других ошибок
      }

      return Promise.reject(getApiError(error))
    }
  )

  return apiClient
}

export const yandexApi = getYandexClientApi()
