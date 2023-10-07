import { useEffect, useRef, useState } from 'react'
import PageFrame from '@/components/PageFrame/PageFrame'
import classes from './styles.module.less'
import GameStartMenu from './components/GameStartMenu/GameStartMenu'
import useGameApi from '@/hooks/useGameApi'
import { exitFullscreen, requestFullscreen } from '@/utils/requestFullscreen'

const Game: React.FC = () => {
  const api = useGameApi(document.querySelector('canvas') as HTMLCanvasElement)
  const [startCountdown, setStartCountdown] = useState<number | string>(3)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval>>()
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
          <GameStartMenu
            setIsGameStarted={setIsGameStarted}
            setStartCountdown={setStartCountdown}
            setIntervalId={setIntervalId}
          />
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
