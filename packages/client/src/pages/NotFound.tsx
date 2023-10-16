import { Header } from '../components/Header'
import { usePage } from '../hooks/usePage'

export const NotFoundPage = () => {
  usePage({ initPage: initNotFoundPage })

  return (
    <div className="App">
      <Header />
      Страница не найдена!
    </div>
  )
}

export const initNotFoundPage = () => Promise.resolve()
