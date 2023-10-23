export const inputsData = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    labelText: 'Почта',
    placeholder: 'Введите почту',
  },
  {
    id: 'login',
    name: 'login',
    type: 'text',
    labelText: 'Логин',
    placeholder: 'Введите логин',
  },
  {
    type: 'text',
    id: 'first_name',
    name: 'first_name',
    labelText: 'Имя',
    placeholder: 'Введите имя',
  },
  {
    type: 'text',
    id: 'second_name',
    name: 'second_name',
    labelText: 'Фамилия',
    placeholder: 'Введите фамилию',
  },
  {
    id: 'phone',
    name: 'phone',
    type: 'text',
    labelText: 'Телефон',
    placeholder: 'Введите Телефон',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    labelText: 'Пароль',
    placeholder: 'Введите пароль',
  },
  {
    id: 'passwordRepeat',
    name: 'passwordRepeat',
    type: 'password',
    labelText: 'Пароль (еще раз)',
    placeholder: 'Введите пароль (еще раз)',
  },
]

export enum REG_FORM_ERROR {
  PASSWORD_DONT_MATCH = 'Значения не одинаковые',
}
