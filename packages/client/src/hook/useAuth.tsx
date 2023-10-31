import { useEffect, useState } from 'react'
import { authApi } from '../api/authApi'
import { ROUTES_NAMES } from '../const/routeNames'
import { useLocation, useNavigate } from 'react-router-dom'

// Создаем кастомный хук для осуществления проверки авторизации пользователя
export const useAuthCheck = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false)

  useEffect(() => {
    authApi
      .getUserData()
      .then(() => {
        // Если запрос выполнен успешно, то устанавливаем isAuth в значение true и isDataFetch в значение true
        setIsAuth(true)
        setIsDataFetched(true)
      })
      .catch(() => {
        // Если запрос выполнен с ошибкой, то устанавливаем isAuth в значение false и isDataFetch в значение true
        setIsAuth(false)
        setIsDataFetched(true)
      })
  }, [pathname])

  // Обрабатываем изменения состояния загрузки данных и авторизации
  useEffect(() => {
    if (isDataFetched) {
      if (
        isAuth &&
        (pathname === ROUTES_NAMES.SIGNUP || pathname === ROUTES_NAMES.SIGN_IN)
      ) {
        // Если пользователь авторизован и переходит на страницу регистрации или авторизации,
        // перенаправляем его на главную страницу
        navigate(ROUTES_NAMES.MAIN)
      }
      if (!isAuth && pathname === ROUTES_NAMES.SIGNUP) {
        // Если пользователь не авторизован и переходит на страницу регистрации, оставляем его на этой странице
        navigate(ROUTES_NAMES.SIGNUP)
      }
      if (!isAuth && pathname !== ROUTES_NAMES.SIGNUP) {
        // Если пользователь не авторизован, перенаправляем его на страницу авторизации
        navigate(ROUTES_NAMES.SIGN_IN)
      }
    }
  }, [isDataFetched, isAuth, pathname, navigate])
}
