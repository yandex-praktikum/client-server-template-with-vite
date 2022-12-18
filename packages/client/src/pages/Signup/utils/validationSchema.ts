import { object, string } from 'yup';

const FIELD_REQUIRED = 'Поле обязательно для заполнения';

export const validationSchema = object().shape({
  first_name: string().required(FIELD_REQUIRED),
  second_name: string().required(FIELD_REQUIRED),
  login: string().required(FIELD_REQUIRED),
  email: string().required(FIELD_REQUIRED),
  password: string().required(FIELD_REQUIRED),
  phone: string().required(FIELD_REQUIRED),
});
