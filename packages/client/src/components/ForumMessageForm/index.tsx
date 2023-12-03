import { Form, Formik } from 'formik'
import { FormInput } from '../FormInput'

import { TForumMessageCreation } from '../../pages/Forum/types'
import styles from './index.module.scss'

type FormMessageFormProps = {
  handleSubmit: (data: TForumMessageCreation) => void
  className?: string
}

export const ForumMessageForm = ({
  handleSubmit,
  className = '',
}: FormMessageFormProps) => {
  return (
    <Formik initialValues={{ message: '' }} onSubmit={handleSubmit}>
      <Form className={`${styles['message-form']} ${className}`}>
        <FormInput
          id="message"
          name="message"
          labelText="Добавить комментарий"
          className={styles['message-control-container']}
          inputClassName={styles['message-control']}
        />
        <button
          type="submit"
          className={`${styles['message-submit']} ${styles.font_16}`}>
          Отправить
        </button>
      </Form>
    </Formik>
  )
}
