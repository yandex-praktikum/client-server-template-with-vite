import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { urls } from '@/utils/navigation'
import classes from './styles.module.less'
const cx = classNames.bind(classes)

interface GameEndType {
  setIsGameRestarted: () => void
  score: number
}

const GameEnd = ({ setIsGameRestarted, score }: GameEndType) => {
  const restartGame = () => {
    setIsGameRestarted()
  }

  return (
    <div className={classes.menu}>
      <div className={classes.menu__gameOver}>GAME OVER</div>
      <div className={classes.menu__score}>
        You score:
        <p>{score.toLocaleString('ru-RU')}</p>
      </div>
      <button
        onClick={restartGame}
        className={cx(classes.menu__btn, classes.menu__btn_start)}>
        Restart
      </button>
      <NavLink
        to={urls.leaderboard}
        className={cx(classes.menu__btn, classes.menu__btn_leaderboard)}>
        Go to Leaderboard
      </NavLink>
    </div>
  )
}

export default GameEnd
