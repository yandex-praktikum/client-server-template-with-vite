import { object, string } from 'yup';

const FIELD_REQUIRED = 'Поле обязательно для заполнения';

export const validationSchema = object().shape({
  login: string().required(FIELD_REQUIRED),
  password: string().required(FIELD_REQUIRED),
});
