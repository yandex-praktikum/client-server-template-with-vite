import { useSelector } from '../store'

import { selectUser } from '../slices/userSlice'
import { Header } from '../components/Header'

export const MainPage = () => {
  const user = useSelector(selectUser)
  return (
    <div>
      <Header />
      {user ? (
        <div>
          <p>{user.name}</p>
          <p>{user.secondName}</p>
        </div>
      ) : (
        <p>Пользователь не найден!</p>
      )}
    </div>
  )
}
