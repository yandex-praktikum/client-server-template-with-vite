import axios, { AxiosError, AxiosInstance } from 'axios'

import getApiError, { ApiError } from './getApiError'

export const getYandexClientApi = (): AxiosInstance => {
  const apiClient = axios.create()
  apiClient.defaults.baseURL = 'https://ya-praktikum.tech/api/v2/'
  apiClient.defaults.withCredentials = true
  apiClient.defaults.validateStatus = status => status >= 200 && status < 300

  apiClient.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiError>) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 500)
      ) {
        //TODO когда будет страница с ошибкой - сделать редерект на нее
        window.location.href = '/'
      }

      return Promise.reject(getApiError(error))
    }
  )

  return apiClient
}

export const yandexApi = getYandexClientApi()
