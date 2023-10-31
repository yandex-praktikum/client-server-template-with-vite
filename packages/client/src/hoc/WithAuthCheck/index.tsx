import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { ROUTES_NAMES } from '../../const/routeNames'

// Создаем функцию высшего порядка (HOC)
export const withAuthCheck = <P extends Record<string, unknown>>(
  WrappedComponent: FC<P>
) => {
  // Возвращаем новый компонент
  return function Component(props: P) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false)

    useEffect(() => {
      authApi
        .getUserData()
        .then(() => {
          setIsAuth(true)
          setIsDataFetched(true)
        })
        .catch(() => {
          setIsAuth(false)
          setIsDataFetched(true)
        })
    }, [pathname])

    useEffect(() => {
      if (isDataFetched) {
        if (
          isAuth &&
          (pathname === ROUTES_NAMES.SIGNUP ||
            pathname === ROUTES_NAMES.SIGN_IN)
        ) {
          navigate(ROUTES_NAMES.MAIN)
        } else if (!isAuth && pathname === ROUTES_NAMES.SIGNUP) {
          navigate(ROUTES_NAMES.SIGNUP)
        } else if (!isAuth && pathname !== ROUTES_NAMES.SIGNUP) {
          navigate(ROUTES_NAMES.SIGN_IN)
        }
      }
    }, [isDataFetched, isAuth, pathname, navigate])

    if (!isDataFetched) return null

    // Оборачиваем и рендерим переданный компонент
    return <WrappedComponent {...props} />
  }
}
