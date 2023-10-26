import { Formik, Form } from 'formik'
import { useState } from 'react'

import { FormInput } from '../../../components/FormInput'
import { MyErrorMessage } from '../../../components/myErrorMessage'
import { TForumCreation } from '../types'
import { FormSubmitButton } from '../../../components/FormSubmitButton'
import { FormLinkButton } from '../../../components/FormAsLinkButton'
import { ROUTES_NAMES } from '../../../const/routeNames'
import { validate } from '../../../utils/validator'
import styles from './index.module.scss'

export const ForumCreation = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (forumCreation: TForumCreation) => {
    console.log(forumCreation)
  }

  const cleanFetchErrorHandler = () => {
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  return (
    <div className={styles['form-container']}>
      <Formik
        initialValues={{ title: '', description: '' }}
        validate={validate}
        onSubmit={handleSubmit}>
        <Form
          onChange={cleanFetchErrorHandler}
          className={styles['forum-form']}>
          <div className={styles['forum-card']}>
            <h2 className={`${styles['forum-title']} ${styles.font_32}`}>
              Создание темы для обсуждения
            </h2>
            <FormInput
              id="title"
              name="title"
              labelText="Введите название темы"
              className={styles['forum-control-container']}
              inputClassName={styles['forum-control']}
            />
            <FormInput
              id="description"
              name="description"
              labelText="Описание"
              as="textarea"
              className={styles['forum-control-container']}
              inputClassName={`${styles['forum-control']} ${styles['forum-textarea']}`}
            />
            {errorMessage ? <MyErrorMessage message={errorMessage} /> : null}
          </div>
          <div className={styles['forum-actions']}>
            <FormSubmitButton
              disabled={false}
              buttonType="submit"
              buttonText="Создать топик"
            />
            <FormLinkButton to={ROUTES_NAMES.FORUM} buttonText="Отменить" />
          </div>
        </Form>
      </Formik>
    </div>
  )
}
