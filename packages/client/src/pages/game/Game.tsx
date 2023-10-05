import { useEffect, useRef, useState } from 'react'
import PageFrame from '@/components/PageFrame/PageFrame'
import classNames from 'classnames'
import CanvasAPI from '@/services/CanvasAPI'
import classes from './styles.module.less'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons'

const cx = classNames.bind(classes)

const Game: React.FC = () => {
  const [api, setApi] = useState<CanvasAPI>()
  const [startCountdown, setStartCountdown] = useState<number | string>(3)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>()

  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      setApi(
        new CanvasAPI(document.querySelector('canvas') as HTMLCanvasElement)
      )
    }
  }, [canvasRef.current])

  const startGame = () => {
    setIsGameStarted(true)
    const id = setInterval(() => {
      setStartCountdown(prev => (typeof prev === 'number' ? prev - 1 : prev))
    }, 1000)
    setIntervalId(id)
  }

  useEffect(() => {
    if (startCountdown === '') {
      api?.startGame()
    }
  }, [startCountdown, api])

  if (startCountdown === 0) {
    clearInterval(intervalId)
    setStartCountdown('Start')
    setTimeout(() => {
      setStartCountdown('')
    }, 500)
  }

  return (
    <PageFrame pageType="game">
      <div className={classes.game}>
        {!isGameStarted ? (
          <div className={classes.game__menu}>
            <button
              onClick={startGame}
              className={cx(classes.game__btn, classes.game__btn_start)}>
              Старт
            </button>
            <button
              className={cx(classes.game__btn, classes.game__btn_options)}>
              Настройки
            </button>
            <div className={classes.game__menuRules}>
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
        ) : (
          <>
            <span className={classes.game__countdown}>{startCountdown}</span>
            <canvas
              ref={canvasRef}
              width="420"
              height="600"
              className={classes.game__field}
            />
          </>
        )}
      </div>
    </PageFrame>
  )
}

export default Game
