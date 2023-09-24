import { AxiosError } from 'axios'

export type ErrorType = {
  error: {
    code: string
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
      code: error.response?.status.toString() || '401',
      description: error.response?.data?.reason || '',
    },
  }
}

export default getApiError
