import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/friends">Страница со списком друзей</Link>
        </li>
        <li>
          <Link to="/404">404</Link>
        </li>
      </ul>
    </nav>
  )
}
