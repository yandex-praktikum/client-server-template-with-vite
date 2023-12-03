import React from 'react'
import { Form, Formik } from 'formik'
import { validate } from '../../utils/validator'
import { clearError } from '../../store/user/slice'
import { TSignInRequestData } from '../../api/types'
import { ROUTES_NAMES } from '../../const/routeNames'
import { login } from '../../store/user/dispatchecrs'
import { FormInput } from '../../components/FormInput'
import { FormHeader } from '../../components/FormHeader'
import { getUserData } from '../../store/user/selectors'
import { FormWrapper } from '../../components/FormWrapper'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { MyErrorMessage } from '../../components/MyErrorMessage'
import { FormLinkButton } from '../../components/FormAsLinkButton'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { YandexAuth } from '../../components/YandexAuth'

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const { isError, errorMessage } = useAppSelector(getUserData)

  const authHandler = (data: TSignInRequestData) => {
    dispatch(login(data))
  }

  const cleanFetchErrorHandler = () => {
    if (errorMessage) {
      dispatch(clearError())
    }
  }

  return (
    <div className="page-wrapper page-background">
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validate={validate}
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
              {isError ? <MyErrorMessage message={errorMessage} /> : null}
            </div>
          </FormWrapper>
          <div className="form-buttons-wrapper button-block-login-page">
            <FormSubmitButton
              disabled={false}
              buttonType="submit"
              buttonText="Авторизоваться"
            />
            <YandexAuth />
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
