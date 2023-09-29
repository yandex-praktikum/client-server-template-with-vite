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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}>
        <canvas
          width="420"
          height="600"
          style={{
            background: '#fff',
          }}
          onClick={startGame}></canvas>
      </div>
    </>
  )
}

export default Canvas
