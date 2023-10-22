import React from 'react'
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

const LoginPage = () => {
  const navigate = useNavigate()

  const authHandler = (data: TSignInRequestData) => {
    authApi
      .login(data)
      .then(response => {
        console.log(response)
        navigate(ROUTES_NAMES.MAIN)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="page_wrapper page_background">
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        onSubmit={values => {
          authHandler(values)
        }}>
        <Form className="form">
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
