import { useEffect } from 'react'
import { authApi } from '../api/authApi'
import { ROUTES_NAMES } from '../const/routeNames'
import { getUserData } from '../store/user/selectors'
import { useAppDispatch, useAppSelector } from './hook'
import { useLocation, useNavigate } from 'react-router-dom'
import { setIsAuth, setIsDataFetched } from '../store/user/slice'

// Создаем кастомный хук для осуществления проверки авторизации пользователя
export const useAuthCheck = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const { isAuth, isDataFetched } = useAppSelector(getUserData)

  useEffect(() => {
    const checkAuth = async () => {
      try {
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
      checkAuth()
    }
  }, [isAuth, isDataFetched, dispatch, pathname])
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
