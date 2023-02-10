import { object, string } from 'yup';

const FIELD_REQUIRED = 'Поле обязательно для заполнения';
const LENGTH_REQUIRED = 'Минимальная длина 10 символов';

export const validationSchemaThread = object().shape({
  title: string().required(FIELD_REQUIRED).min(10, LENGTH_REQUIRED),
});

export const validationSchemaComment = object().shape({
  content: string().required(FIELD_REQUIRED),
});
