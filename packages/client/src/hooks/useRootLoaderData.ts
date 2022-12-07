import { useRouteLoaderData } from 'react-router-dom'
import { IUserInfo } from '../types/pageContext'
import { AUTHORIZED_ROUTES } from '../utils/routes'

export const useRootLoaderData = () =>
  useRouteLoaderData('root') as {
    userInfo: IUserInfo | null
    userRoutes: typeof AUTHORIZED_ROUTES
  }
