import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { authApi } from '../../api/authApi'
import { useAppDispatch } from '../../hook/hook'
import { API_ERROR_MESSAGES } from '../../const/api'
import { TSignInRequestData } from '../../api/types'
import { ROUTES_NAMES } from '../../const/routeNames'
import { FormInput } from '../../components/FormInput'
import { FormHeader } from '../../components/FormHeader'
import { FormWrapper } from '../../components/FormWrapper'
import { MyErrorMessage } from '../../components/MyErrorMessage'
import { FormLinkButton } from '../../components/FormAsLinkButton'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { setIsAuth, setIsDataFetched } from '../../store/user/slice'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = useState('')

  const authHandler = (data: TSignInRequestData) => {
    authApi
      .login(data)
      .then(() => {
        dispatch(setIsAuth(true))
        dispatch(setIsDataFetched(true))
        navigate(ROUTES_NAMES.MAIN)
      })
      .catch(error => {
        const { reason } = error.response.data
        if (reason === API_ERROR_MESSAGES.USER_ALREADY_IN_SYSTEM) {
          dispatch(setIsAuth(true))
          dispatch(setIsDataFetched(true))
          navigate(ROUTES_NAMES.MAIN)
        }

        setErrorMessage(reason)
      })
  }

  const cleanFetchErrorHandler = () => {
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  return (
    <div className="page-wrapper page-background">
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        onSubmit={authHandler}>
        <Form onChange={cleanFetchErrorHandler} className="form">
          <FormWrapper>
            <FormHeader text="Вход" />
            <div className="form-inputs-wrapper">
              <FormInput
                type="text"
                id="login"
                name="login"
                labelText="Логин"
                placeholder="Введите логин"
              />
              <FormInput
                id="password"
                name="password"
                type="password"
                labelText="Пароль"
                placeholder="Введите пароль"
              />
              {errorMessage ? <MyErrorMessage message={errorMessage} /> : null}
            </div>
          </FormWrapper>
          <div className="form-buttons-wrapper button-block-login-page">
            <FormSubmitButton
              disabled={false}
              buttonType="submit"
              buttonText="Авторизоваться"
            />
            <FormLinkButton
              to={ROUTES_NAMES.SIGNUP}
              buttonText="Нет аккаунта?"
            />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginPage
