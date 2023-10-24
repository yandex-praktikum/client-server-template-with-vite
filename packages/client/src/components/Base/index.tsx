import Header from '../Header'
import s from './index.module.scss'
import { typedMemo } from '../../utils/typedMemo'
import { Outlet } from 'react-router-dom'

const BaseComponent = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Header />
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export const Base = typedMemo(BaseComponent)
