import React from 'react'
import { Form, Formik } from 'formik'
import { FormWrapper } from '../../components/FormWrapper'
import { FormHeader } from '../../components/FormHeader'
import { FormInput } from '../../components/FormInput'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { FormLinkButton } from '../../components/FormAsLinkButton'
import { ROUTES_NAMES } from '../../const/routeNames'

const RegistrationPage = () => {
  return (
    <div className="page_wrapper">
      <Formik
        initialValues={{
          email: '',
          login: '',
          first_name: '',
          second_name: '',
          phone: '',
          password: '',
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500))
          alert(JSON.stringify(values, null, 2))
        }}>
        <FormWrapper>
          <Form>
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
                id="second_name"
                name="second_name"
                type="password"
                labelText="Фамилия"
                placeholder="Введите фамилию"
              />
              <FormInput
                id="phone"
                name="phone"
                type="text"
                labelText="Пароль"
                placeholder="Введите пароль"
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
            <div className="form_buttons-wrapper button-block_login-reg-page">
              <FormSubmitButton
                disabled={false}
                buttonType="submit"
                buttonText="Зарегистрироваться"
              />
              <FormLinkButton to={ROUTES_NAMES.SIGN_IN} buttonText="Войти" />
            </div>
          </Form>
        </FormWrapper>
      </Formik>
    </div>
  )
}

export default RegistrationPage
