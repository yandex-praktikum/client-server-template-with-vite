import React, { ReactElement } from 'react'
import classNames from 'classnames'
import { PageTypes } from '@components/types'
import Header from '@components/Header/Header'
import classes from './styles.module.less'

const cx = classNames.bind(classes)

interface PageFrameProps {
  name: PageTypes
  children: ReactElement
}

const PageFrame = ({ name, children }: PageFrameProps) => {
  return (
    <div
      className={cx(
        classes.pageFrame,
        classes[`pageFrame__${name}`] || classes[`pageFrame__default`]
      )}>
      <Header activePage={name} />
      <div
        className={cx(
          classes.pageFrame__content,
          classes[`pageFrame__content__${name}`] ||
            classes[`pageFrame__content__default`]
        )}>
        {children}
      </div>
    </div>
  )
}

export default PageFrame
