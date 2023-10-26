import React, { useState } from 'react'
import { FormWrapper } from '../../components/FormWrapper'
import { Form, Formik } from 'formik'
import { FormHeader } from '../../components/FormHeader'
import { FormInput } from '../../components/FormInput'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { FormLinkButton } from '../../components/FormAsLinkButton'
import { ROUTES_NAMES } from '../../const/routeNames'
import { authApi } from '../../api/authApi'
import { useNavigate } from 'react-router-dom'
import { TSignInRequestData } from '../../api/types'
import { API_ERROR_MESSAGES } from '../../const/api'
import { MyErrorMessage } from '../../components/myErrorMessage'

const LoginPage = () => {
  console.log(123)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const authHandler = (data: TSignInRequestData) => {
    authApi
      .login(data)
      .then(response => {
        console.log(response)
        navigate(ROUTES_NAMES.MAIN)
      })
      .catch(error => {
        const { reason } = error.response.data
        if (reason === API_ERROR_MESSAGES.USER_ALREADY_IN_SYSTEM) {
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
    <div className="page_wrapper page_background">
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        onSubmit={authHandler}>
        <Form onChange={cleanFetchErrorHandler} className="form">
          <FormWrapper>
            <FormHeader text="Вход" />
            <div className="form_inputs-wrapper">
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
          <div className="form_buttons-wrapper button-block_login-page">
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
