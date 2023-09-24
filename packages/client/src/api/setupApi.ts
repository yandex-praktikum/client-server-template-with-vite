import axios, { AxiosError, AxiosInstance } from 'axios'

import getApiError, { DataErrorType } from './getApiError'

export const getYandexClientApi = (): AxiosInstance => {
  const apiClient = axios.create()
  apiClient.defaults.baseURL = 'https://ya-praktikum.tech/api/v2/'
  apiClient.defaults.withCredentials = true
  apiClient.defaults.validateStatus = status => status >= 200 && status < 300

  apiClient.interceptors.response.use(
    response => response,
    (error: AxiosError<DataErrorType>) => {
      return Promise.reject(getApiError(error))
    }
  )

  return apiClient
}

export const yandexApi = getYandexClientApi()
