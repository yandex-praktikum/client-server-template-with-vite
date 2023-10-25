import Header from '../Header'
import s from './index.module.scss'
import { Outlet } from 'react-router-dom'

export const BaseComponent = () => {
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
