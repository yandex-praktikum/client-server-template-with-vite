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
      const fetchData = async () => {
        try {
          await authApi.getUserData() // Запрос к API
          // Если запрос выполнен успешно, то устанавливаем isAuth в значение true и isDataFetch в значение true
          setIsAuth(true)
        } catch (error) {
          // Если запрос выполнен с ошибкой, то устанавливаем isAuth в значение false и isDataFetch в значение true
          setIsAuth(false)
        } finally {
          // В финале устанавливает флаг завершения получения данных в true
          setIsDataFetched(true)
        }
      }

      fetchData()
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
