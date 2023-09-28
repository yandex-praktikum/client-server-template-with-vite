import React, { useEffect } from 'react'
import CanvasAPI from '@/services/CanvasAPI'

const Canvas: React.FC = () => {
  let api: CanvasAPI

  useEffect(() => {
    api = new CanvasAPI(document.querySelector('canvas') as HTMLCanvasElement)
  }, [])

  const startGame = () => {
    api.startGame()
  }

  return (
    <>
      <canvas
        width="420"
        height="600"
        style={{
          background: '#fff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={startGame}></canvas>
    </>
  )
}

export default Canvas
