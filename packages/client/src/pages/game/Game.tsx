import React, { useEffect } from 'react'
import CanvasAPI from '@/services/CanvasAPI'
import classes from './styles.module.less'

const Game: React.FC = () => {
  let api: CanvasAPI

  useEffect(() => {
    api = new CanvasAPI(document.querySelector('canvas') as HTMLCanvasElement)
  }, [])

  const startGame = () => {
    api.startGame()
  }

  return (
    <canvas
      width="420"
      height="600"
      className={classes.game}
      onClick={startGame}
    />
  )
}

export default Game
