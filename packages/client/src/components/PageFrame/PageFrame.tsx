import React, { ReactElement } from 'react'
import classNames from 'classnames'
import Header from '@components/Header/Header'
import classes from './styles.module.less'

const cx = classNames.bind(classes)

interface PageFrameProps {
  children: ReactElement | ReactElement[]
}

const PageFrame = ({ children }: PageFrameProps) => {
  const activePage = window.location.pathname.substring(1).split('/')[0]
  return (
    <div
      className={cx(
        classes.pageFrame,
        classes[`pageFrame__${activePage}`] || classes[`pageFrame__default`]
      )}>
      <Header />
      <div
        className={cx(
          classes.pageFrame__content,
          classes[`pageFrame__content__${activePage}`] ||
            classes[`pageFrame__content__default`]
        )}>
        {children}
      </div>
    </div>
  )
}

export default PageFrame
