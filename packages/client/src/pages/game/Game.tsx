import { useEffect, useMemo, useRef, useState } from 'react'
import PageFrame from '@/components/PageFrame/PageFrame'
import classes from './styles.module.less'
import GameStartMenu from './components/GameStartMenu'
import GameEnd from './components/GameEnd'
import useGameApi from '@/hooks/useGameApi'
import { exitFullscreen, requestFullscreen } from '@/utils/requestFullscreen'

const Game: React.FC = () => {
  const [startCountdown, setStartCountdown] = useState<number | string>(3)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>()
  const [gameScore, setGameScore] = useState({ score: 0, speed: 0 })
  const gameApi = useGameApi({
    element: document.querySelector('canvas') as HTMLCanvasElement,
    setScore: setGameScore,
    setGameEnd: setIsGameEnded,
  })

  const canvasRef = useRef(null)

  useEffect(() => {
    let fullScreen = false
    function onFullScreenChanged(ev: KeyboardEvent) {
      if (ev.key.toLocaleLowerCase() == 'f') {
        const gameEl = document.getElementsByClassName(classes.game)
        if (gameEl && gameEl.length) {
          if (fullScreen === false) {
            fullScreen = true
            requestFullscreen(gameEl[0])
          } else {
            fullScreen = false
            exitFullscreen()
          }
        }
      }
    }

    document.addEventListener('keydown', onFullScreenChanged)
    return () => document.removeEventListener('keydown', onFullScreenChanged)
  }, [])

  useEffect(() => {
    if (startCountdown === '') {
      gameApi?.startGame()
    }
  }, [startCountdown, gameApi])

  const restartGame = () => {
    setIsGameStarted(false)
    setIsGameEnded(false)
    setStartCountdown(3)
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
        {startCountdown && (
          <span className={classes.game__countdown}>{startCountdown}</span>
        )}
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
  }, [isGameEnded, isGameStarted, gameScore, startCountdown])

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
