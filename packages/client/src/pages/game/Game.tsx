import { useEffect, useMemo, useRef, useState } from 'react'
import PageFrame from '@/components/PageFrame/PageFrame'
import classes from './styles.module.less'
import GameStartMenu from './components/GameStartMenu'
import GameEnd from './components/GameEnd'
import useGameApi from '@/hooks/useGameApi'

const Game: React.FC = () => {
  const api = useGameApi(document.querySelector('canvas') as HTMLCanvasElement)
  const [startCountdown, setStartCountdown] = useState<number | string>(3)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>()

  const canvasRef = useRef(null)

  useEffect(() => {
    if (startCountdown === '') {
      api?.startGame()
    }
  }, [startCountdown, api])

  const restartGame = () => {
    setIsGameStarted(false)
    setIsGameEnded(false)
  }

  const content = useMemo(() => {
    if (isGameEnded) {
      return <GameEnd setIsGameRestarted={restartGame} score={23400} />
    }

    if (!isGameStarted) {
      return (
        <GameStartMenu
          setIsGameStarted={setIsGameStarted}
          setStartCountdown={setStartCountdown}
          setIntervalId={setIntervalId}
        />
      )
    }

    return (
      <>
        <span className={classes.game__countdown}>{startCountdown}</span>
        <canvas
          ref={canvasRef}
          width="420"
          height="600"
          className={classes.game__field}
        />
      </>
    )
  }, [isGameEnded, isGameStarted])

  if (startCountdown === 0) {
    clearInterval(intervalId)
    setStartCountdown('Start')
    setTimeout(() => {
      setStartCountdown('')
    }, 500)
  }

  return (
    <PageFrame pageType="game">
      <div className={classes.game}>{content}</div>
    </PageFrame>
  )
}

export default Game
