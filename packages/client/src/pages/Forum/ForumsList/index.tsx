import React from 'react'
import { Link } from 'react-router-dom'

import { MOCK_FORUMS } from '../mockForums'
import { FormLinkButton } from '../../../components/FormAsLinkButton'
import styles from './index.module.scss'

export const ForumPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.font_40} ${styles['forum-title']}`}>Форумы</h1>
      <ul className={styles['forums-container']}>
        {MOCK_FORUMS.map(mockForum => (
          <li key={mockForum.id}>
            <Link
              className={`${styles.forum} ${styles.font_32}`}
              to={mockForum.id}>
              {mockForum.title}
            </Link>
          </li>
        ))}
      </ul>
      <FormLinkButton
        to="create"
        buttonText="Создать тему"
        className={styles['forum-create']}
      />
    </div>
  )
}
