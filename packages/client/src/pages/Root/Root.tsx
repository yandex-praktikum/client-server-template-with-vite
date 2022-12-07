import { FC, useState } from 'react'
import styles from './Root.module.scss'
import { Card } from '@mui/material'
import MainCardHeader from './components/MainCardHeader'
import { Outlet } from 'react-router'
import PageWrapper from '../../components/PageWrapper'

const Root: FC = () => {
  const [pageName, setPageName] = useState('')

  return (
    <PageWrapper>
      <Card variant="outlined" className={styles.wrapper}>
        <MainCardHeader pageName={pageName} />
        <Outlet context={{ setPageName }} />
      </Card>
    </PageWrapper>
  )
}

export default Root
