import { OAUTH_REDIRECT_URL } from '../const/api'

export const getFullUrlToResource = (
  url: string | null,
  resourceBaseUrl: string
) => {
  if (!url) {
    return ''
  }

  return `${resourceBaseUrl}${url}`
}

export const generateYandexOAuthUrl = (serviceId: string): string => {
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${OAUTH_REDIRECT_URL}`
}
