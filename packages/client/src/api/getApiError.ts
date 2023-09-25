import { AxiosError } from 'axios'

export type ErrorType = {
  error: {
    code: number
    description: string
    details?: unknown
  }
}

export type DataErrorType = {
  reason?: string
}
const getApiError = (error: AxiosError<DataErrorType>): ErrorType => {
  return {
    error: {
      code: error.response?.status || 401,
      description: error.response?.data?.reason || '',
    },
  }
}

export default getApiError
