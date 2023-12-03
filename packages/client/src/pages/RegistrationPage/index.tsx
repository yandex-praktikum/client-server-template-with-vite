import React from 'react'
import { Form, Formik } from 'formik'
import { validate } from '../../utils/validator'
import { clearError } from '../../store/user/slice'
import { TSignupRequestData } from '../../api/types'
import { ROUTES_NAMES } from '../../const/routeNames'
import { FormInput } from '../../components/FormInput'
import { signup } from '../../store/user/dispatchecrs'
import { FormHeader } from '../../components/FormHeader'
import { getUserData } from '../../store/user/selectors'
import { FormWrapper } from '../../components/FormWrapper'
import { MyErrorMessage } from '../../components/MyErrorMessage'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { FormLinkButton } from '../../components/FormAsLinkButton'
import { FormSubmitButton } from '../../components/FormSubmitButton'
import { inputsData, REG_FORM_ERROR } from '../../const/registrationPage'

const RegistrationPage = () => {
  const dispatch = useAppDispatch()
  const { isError, errorMessage } = useAppSelector(getUserData)

  const registrationHandler = (
    data: TSignupRequestData,
    { setErrors }: { setErrors: (error: Record<string, string>) => void }
  ) => {
    const { password, passwordRepeat } = data

    if (password && password !== passwordRepeat) {
      setErrors({
        password: REG_FORM_ERROR.PASSWORD_DONT_MATCH,
        passwordRepeat: REG_FORM_ERROR.PASSWORD_DONT_MATCH,
      })
      return
    }

    dispatch(signup(data))
  }

  const cleanFetchErrorHandler = () => {
    if (errorMessage) {
      dispatch(clearError())
    }
  }

  const formInputs = inputsData.map(
    ({ id, type, name, labelText, placeholder }) => (
      <FormInput
        key={id}
        id={id}
        name={name}
        type={type}
        labelText={labelText}
        placeholder={placeholder}
      />
    )
  )

  return (
    <div className="page-wrapper page-background">
      <Formik
        initialValues={{
          email: '',
          login: '',
          first_name: '',
          second_name: '',
          phone: '',
          password: '',
          passwordRepeat: '',
        }}
        onSubmit={registrationHandler}
        validate={validate}>
        <Form onChange={cleanFetchErrorHandler} className="form">
          <FormWrapper>
            <FormHeader text="Регистрация" />
            <div className="form-inputs-wrapper">
              {formInputs}
              {isError ? <MyErrorMessage message={errorMessage} /> : null}
            </div>
          </FormWrapper>
          <div className="form-buttons-wrapper button-block-login-reg-page">
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
