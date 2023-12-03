import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { ROUTES_NAMES } from '../../const/routeNames'
import { getUserData } from '../../store/user/selectors'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { setIsAuth, setIsDataFetched } from '../../store/user/slice'

// Создаем функцию высшего порядка (HOC)
export const withAuthCheck = <P extends Record<string, unknown>>(
  WrappedComponent: FC<P>
) => {
  // Возвращаем новый компонент
  return function Component(props: P) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const { isAuth, isDataFetched } = useAppSelector(getUserData)

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (searchParams.get('code')) {
            await authApi.loginOAuth({
              code: searchParams.get('code') ?? '',
              redirect_uri: 'http://localhost:3000',
            })
          }

          await authApi.getUserData() // Запрос к API
          // Если запрос выполнен успешно, то устанавливаем isAuth в значение true
          dispatch(setIsAuth(true))
        } catch (error) {
          // Если запрос выполнен с ошибкой, то устанавливаем isAuth в значение false
          dispatch(setIsAuth(false))
        } finally {
          // В финале устанавливает флаг завершения получения данных в true
          dispatch(setIsDataFetched(true))
        }
      }
      if (!isAuth && !isDataFetched) {
        fetchData()
      }
    }, [isAuth, isDataFetched, dispatch, pathname])

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
