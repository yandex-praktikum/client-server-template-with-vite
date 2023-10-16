import { useSelector } from '../store'
import { Header } from '../components/Header'
import { selectUser } from '../slices/userSlice'

export const FriendsPage = () => {
  const friends = [{name: 'Петя', secondName: 'Семенов'}]
  const isLoading = true
  const user = useSelector(selectUser)

  return (
    <div className="App">
      <Header />
      {user ? (
        <>
          <h3>Информация о пользователе:</h3>{' '}
          <p>
            {user.name} {user.secondName}
          </p>
        </>
      ) : (
        <h3>Пользователь не найден</h3>
      )}
      {isLoading ? (
        'Загрузка списка...'
      ) : (
        <ul>
          {friends.map(friend => (
            <li key={friend.name}>
              {friend.name} {friend.secondName}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
