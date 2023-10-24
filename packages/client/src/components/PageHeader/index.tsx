import React from 'react'
import { Navbar } from '../Navbar'
import { BackButton } from '../BackButton'
import style from './index.module.scss'

type TPageHeader = {
  url: string
  pathName: string
  className?: string
}

export const PageHeader = ({ url, pathName, className = '' }: TPageHeader) => {
  return (
    <div className={`${style.page_header} ${className}`}>
      <BackButton />
      <Navbar imageUrl={url} pathName={pathName} />
    </div>
  )
}
