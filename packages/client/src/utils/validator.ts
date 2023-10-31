import { REGEXP } from '../const/regexp'
import { FormikValues } from 'formik'

export type InputType =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'message'
  | 'rep_password'
  | 'oldPassword'
  | 'newPassword'
  | 'repeatNewPassword'
  | 'passwordRepeat'
  | 'description'
  | 'title'
  | ''

type TValidate = (value: string, inputName: InputType) => Record<string, string>

const nameValidator: TValidate = (name, inputName) => {
  const errors: Record<string, string> = {}

  if (!name?.trim()) {
    errors[inputName] = 'Поле не должно быть пустым.'
    return errors
  }
  if (!REGEXP.startWithCapitalizeLetter.test(name)) {
    errors[inputName] = 'Первая буква должна быть заглавной'
    return errors
  }
  if (!REGEXP.noSpaceSymbols.test(name)) {
    errors[inputName] = 'Нельзя использовать пробелы'
    return errors
  }
  if (!REGEXP.noDigitSymbols.test(name)) {
    errors[inputName] = 'Нельзя использовать цифры'
    return errors
  }
  if (!REGEXP.noSpecialSymbols.test(name)) {
    errors[inputName] =
      'Нельзя использовать спец символы, допустим только дефис(-)'
    return errors
  }
  if (!REGEXP.namesValidation.test(name)) {
    errors[inputName] =
      'Допускается использовать только Русские или Английские буквы'
    return errors
  }
  return errors
}

const loginValidator: TValidate = (login, inputName) => {
  const errors: Record<string, string> = {}

  if (!login?.trim()) {
    errors[inputName] = 'Поле не должно быть пустым.'
    return errors
  }
  if (!REGEXP.latinLetters.test(login)) {
    errors[inputName] = 'Допустима только латиница'
    return errors
  }
  if (!REGEXP.noSpecialSymbolsLogin.test(login)) {
    errors[inputName] =
      'Нельзя использовать спец символы и пробелы, допустимы дефис и нижнее подчёркивание(- _)'
    return errors
  }
  if (login.length < 3 || login.length > 20) {
    errors[inputName] = 'Длинна от 3 до 20 символов'
    return errors
  }
  if (!REGEXP.digitsAndLetters.test(login)) {
    errors[inputName] = 'Может содержать цифры, но не состоять из них'
    return errors
  }
  return errors
}

const emailValidator: TValidate = (email, inputName) => {
  const errors: Record<string, string> = {}

  if (!email?.trim()) {
    errors[inputName] = 'Поле не должно быть пустым.'
    return errors
  }
  if (!REGEXP.emailValidation.test(email)) {
    errors[
      inputName
    ] = `Ошибка заполнения, допустима только латиница, обязательно должна быть «собака» (@)
     и точка после неё, но перед точкой обязательно должны быть буквы`
    return errors
  }
  if (!REGEXP.emailValidation.test(email)) {
    errors[inputName] = 'Допустима только латиница'
    return errors
  }
  return errors
}

const passwordValidator: TValidate = (password, inputName) => {
  const errors: Record<string, string> = {}

  if (password.length < 8 || password.length > 40) {
    errors[inputName] = 'От 8 до 40 символов.'
    return errors
  }
  if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
    errors[inputName] = 'Требуется хотя бы одна заглавная буква и цифра.'
    return errors
  }
  return errors
}

const phoneValidator: TValidate = (phone, inputName) => {
  const errors: Record<string, string> = {}

  if (phone.length < 10 || phone.length > 15) {
    errors[inputName] = 'От 10 до 15 символов.'
    return errors
  }
  if (!REGEXP.phoneValidation.test(phone)) {
    errors[inputName] = 'Можно использовать только цифры и плюс в начале номера'
  }

  return errors
}

const messageValidator: TValidate = (message, inputName) => {
  const errors: Record<string, string> = {}

  if (!message.trim()) {
    errors[inputName] = 'Сообщение не должно быть пустым.'
  }

  return errors
}

const descriptionValidator: TValidate = (message, inputName) => {
  const errors: Record<string, string> = {}

  if (!message.trim()) {
    errors[inputName] = 'Описание не может быть пустым'
  }

  return errors
}

const titleValidator: TValidate = (message, inputName) => {
  const errors: Record<string, string> = {}

  if (!message.trim()) {
    errors[inputName] = 'Название не может быть пустым'
  }

  return errors
}

export const validate: (values: FormikValues) => void | object = values => {
  const errorsArray = Object.entries(values).map(item => {
    const inputName = item[0]
    const values = item[1]

    switch (inputName) {
      case 'first_name':
      case 'second_name':
        return nameValidator(values, inputName)
      case 'login':
        return loginValidator(values, inputName)
      case 'email':
        return emailValidator(values, inputName)
      case 'password':
      case 'passwordRepeat':
      case 'oldPassword':
      case 'newPassword':
      case 'repeatNewPassword':
        return passwordValidator(values, inputName)
      case 'phone':
        return phoneValidator(values, inputName)
      case 'message':
        return messageValidator(values, inputName)
      case 'description':
        return descriptionValidator(values, inputName)
      case 'title':
        return titleValidator(values, inputName)
      default:
        return {}
    }
  })

  const errors: Record<string, string> = {}
  errorsArray.forEach(item => {
    Object.assign(errors, item)
  })

  return errors
}
