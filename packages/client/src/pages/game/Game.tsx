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
<<<<<<< HEAD
  const [nextShape, setNextShape] = useState<string>()
=======
>>>>>>> 9cef51e (feat: add game logic)
  const api = useGameApi({
    element: document.querySelector('canvas') as HTMLCanvasElement,
    setScore: setGameScore,
    setGameEnd: setIsGameEnded,
<<<<<<< HEAD
    setNextShape: setNextShape
=======
>>>>>>> 9cef51e (feat: add game logic)
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
    setStartCountdown(3)
<<<<<<< HEAD
    clearInterval(intervalId)
    setNextShape('')
=======
>>>>>>> 9cef51e (feat: add game logic)
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
<<<<<<< HEAD
          <button
            className={classes.game__btnBack}
            onClick={() => {
              restartGame()
              api?.gameOver()
            }}>
            Выйти
          </button>
          <p>Score: {gameScore.score}</p>
          <p>Speed: {gameScore.speed}</p>
          {nextShape && (
            <div className={classes.game__nextBlock}>
              Next:{' '}
              <img
                style={{
                  width: 50,
                  height: 50
                }}
                src={`../../../public/${nextShape}.svg`}
                alt="next shape"
              />
            </div>
          )}
        </div>
      </>
    )
  }, [isGameEnded, isGameStarted, gameScore, nextShape, startCountdown])
=======
          <p>Score: {gameScore.score}</p>
          <p>Speed: {gameScore.speed}</p>
        </div>
      </>
    )
  }, [isGameEnded, isGameStarted, gameScore, startCountdown])
>>>>>>> 9cef51e (feat: add game logic)

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
