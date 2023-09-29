import React, { ReactElement } from 'react'
import classNames from 'classnames'
import Header from '@components/Header/Header'
import classes from './styles.module.less'
import { PageTypes } from '@components/types'

const cx = classNames.bind(classes)

interface PageFrameProps {
  children: ReactElement | ReactElement[]
  pageType: PageTypes
}

const PageFrame = ({ pageType, children }: PageFrameProps) => {
  return (
    <div
      className={cx(
        classes.pageFrame,
        classes[`pageFrame__${pageType}`] || classes[`pageFrame__default`]
      )}>
      <Header />
      <div
        className={cx(
          classes.pageFrame__content,
          classes[`pageFrame__content__${pageType}`] ||
            classes[`pageFrame__content__default`]
        )}>
        {children}
      </div>
    </div>
  )
}

export default PageFrame
