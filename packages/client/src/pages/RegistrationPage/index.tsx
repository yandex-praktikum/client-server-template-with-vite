import React from 'react'
import { Form, Formik } from 'formik'
import { FormWrapper } from '../../components/FormWrapper'
import { FormHeader } from '../../components/FormHeader'
import { FormInput } from '../../components/FormInput'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { FormLinkButton } from '../../components/FormAsLinkButton'
import { ROUTES_NAMES } from '../../const/routeNames'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../api/authApi'
import { TSignupRequestData } from '../../api/types'

const RegistrationPage = () => {
  const navigate = useNavigate()

  const registrationHandler = (data: TSignupRequestData) => {
    authApi
      .signup(data)
      .then(response => {
        console.log(response)
        console.log(response)
        navigate(ROUTES_NAMES.MAIN)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="page_wrapper page_background">
      <Formik
        initialValues={{
          email: '',
          login: '',
          first_name: '',
          second_name: '',
          phone: '',
          password: '',
        }}
        onSubmit={values => {
          registrationHandler(values)
        }}>
        <Form className="form">
          <FormWrapper>
            <FormHeader text="Регистрация" />
            <div className="form_inputs-wrapper">
              <FormInput
                id="email"
                name="email"
                type="email"
                labelText="Почта"
                placeholder="Введите почту"
              />
              <FormInput
                id="login"
                name="login"
                type="text"
                labelText="Логин"
                placeholder="Введите логин"
              />
              <FormInput
                type="text"
                id="first_name"
                name="first_name"
                labelText="Имя"
                placeholder="Введите имя"
              />
              <FormInput
                type="text"
                id="second_name"
                name="second_name"
                labelText="Фамилия"
                placeholder="Введите фамилию"
              />
              <FormInput
                id="phone"
                name="phone"
                type="text"
                labelText="Телефон"
                placeholder="Введите Телефон"
              />
              <FormInput
                id="password"
                name="password"
                type="password"
                labelText="Пароль"
                placeholder="Введите пароль"
              />
              <FormInput
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                labelText="Пароль (еще раз)"
                placeholder="Введите пароль (еще раз)"
              />
            </div>
          </FormWrapper>
          <div className="form_buttons-wrapper button-block_login-reg-page">
            <FormSubmitButton
              disabled={false}
              buttonType="submit"
              buttonText="Зарегистрироваться"
            />
            <FormLinkButton to={ROUTES_NAMES.SIGN_IN} buttonText="Войти" />
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default RegistrationPage
