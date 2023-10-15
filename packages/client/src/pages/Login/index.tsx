import React from 'react'
import { FormWrapper } from '../../components/FormWrapper'
import { Form, Formik } from 'formik'
import { FormHeader } from '../../components/FormHeader'
import { FormInput } from '../../components/FormInput'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { FormLinkButton } from '../../components/FormAsLinkButton'
import { ROUTES_NAMES } from '../../const/routeNames'

const LoginPage = () => {
  return (
    <div className="page_wrapper">
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500))
          alert(JSON.stringify(values, null, 2))
        }}>
        <FormWrapper>
          <Form>
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
        </FormWrapper>
      </Formik>
    </div>
  )
}

export default LoginPage
