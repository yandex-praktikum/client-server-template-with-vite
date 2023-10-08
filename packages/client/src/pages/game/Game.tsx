import { useEffect, useMemo, useRef, useState } from 'react'
import PageFrame from '@/components/PageFrame/PageFrame'
import classes from './styles.module.less'
import GameStartMenu from './components/GameStartMenu'
import GameEnd from './components/GameEnd'
import useGameApi from '@/hooks/useGameApi'

const Game: React.FC = () => {
  const [startCountdown, setStartCountdown] = useState<number | string>(3)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>()
  const [gameScore, setGameScore] = useState({ score: 0, speed: 0 })
  const api = useGameApi({
    element: document.querySelector('canvas') as HTMLCanvasElement,
    setScore: setGameScore,
    setGameEnd: setIsGameEnded,
  })

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
      return (
        <GameEnd setIsGameRestarted={restartGame} score={gameScore.score} />
      )
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
        <div className={classes.game__score}>
          <p>Score: {gameScore.score}</p>
          <p>Speed: {gameScore.speed}</p>
        </div>
      </>
    )
  }, [isGameEnded, isGameStarted, gameScore])

  if (startCountdown === 0) {
    clearInterval(intervalId)
    setStartCountdown('Start')
    setGameScore({ score: 0, speed: 0 })
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
