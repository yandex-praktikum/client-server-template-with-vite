import classNames from 'classnames'
import classes from './styles.module.less'
import { useEffect, useState } from 'react'
import CanvasAPI from '@/services/CanvasAPI'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons'
const cx = classNames.bind(classes)

interface GameStartMenuI {
  setIsGameStarted: (a: boolean) => void
  setStartCountdown: React.Dispatch<React.SetStateAction<string | number>>
  setIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timer | undefined>>
}

const GameStartMenu: React.FC<GameStartMenuI> = ({
  setIsGameStarted,
  setStartCountdown,
  setIntervalId,
}) => {
  const startGame = () => {
    setIsGameStarted(true)
    const id = setInterval(() => {
      setStartCountdown(prev => (typeof prev === 'number' ? prev - 1 : prev))
    }, 1000)
    setIntervalId(id)
  }

  return (
    <div className={classes.menu}>
      <button
        onClick={startGame}
        className={cx(classes.menu__btn, classes.menu__btn_start)}>
        Старт
      </button>
      <button className={cx(classes.menu__btn, classes.menu__btn_options)}>
        Настройки
      </button>
      <div className={classes.menu__menuRules}>
        <p>
          move left
          <ArrowLeftOutlined />
        </p>
        <p>
          move right
          <ArrowRightOutlined />
        </p>
        <p>
          rotate
          <ArrowUpOutlined />
        </p>
      </div>
    </div>
  )
}

export default GameStartMenu
