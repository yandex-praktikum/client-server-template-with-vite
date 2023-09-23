import React, { ReactElement } from 'react'
import classNames from 'classnames'
import { activePage } from '@/utils/navigation'
import Header from '@components/Header/Header'
import classes from './styles.module.less'

const cx = classNames.bind(classes)

interface PageFrameProps {
  children: ReactElement
}

const PageFrame = ({ children }: PageFrameProps) => {
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
