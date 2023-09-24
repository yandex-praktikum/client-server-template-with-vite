import { AxiosError } from 'axios'

export type Error = {
  code: string
  description: string
  details?: unknown
}

export type ApiError = {
  error?: Error
}

const getApiError = (error: AxiosError<ApiError>): Error => {
  console.log('=error', error)
  if (
    error.response?.data?.error?.code &&
    error.response?.data?.error?.code.toString() !== '0'
  ) {
    return error.response?.data.error
  }

  return {
    code: '400',
    description: error.response?.data?.error?.description || '',
  }
}

export default getApiError
