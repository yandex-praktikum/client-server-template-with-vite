import React, { useEffect, useRef } from 'react'

import { MySnake } from './Snake'

export function CanvasComponent() {
  const ref = useRef<HTMLCanvasElement>(null)

  const MAP_WIDTH = 1200
  const MAP_HEIGHT = 800

  let mousePositionX = MAP_WIDTH / 2
  let mousePositionY = MAP_HEIGHT / 2
  let boost = false

  function onMouseMove(e: MouseEvent) {
    if (!ref.current) {
      throw Error('Not found canvas')
    }

    mousePositionX = Math.ceil(
      e.clientX - ref.current.getBoundingClientRect().left
    )

    mousePositionY = Math.ceil(
      e.clientY - ref.current.getBoundingClientRect().top
    )
  }

  function onMouseDown() {
    boost = true
  }

  function onMouseUp() {
    boost = false
  }

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) {
      throw Error('No canvas or context')
    }

    document.addEventListener('mousemove', onMouseMove)

    canvas.width = MAP_WIDTH
    canvas.height = MAP_HEIGHT

    const snake = new MySnake(mousePositionX, mousePositionY, ctx, 'green')

    const drawLogs = () => {
      ctx.font = '20px serif'
      ctx.fillStyle = 'white'
      ctx.fillText(`Boost: ${boost}`, 10, 20)
      ctx.fillText(`Snake length: ${snake.segments.length}`, 10, 40)
      ctx.fillText(`Mouse x: ${mousePositionX} ; y: ${mousePositionY}`, 10, 60)
    }

    const sendCoordsLoop = () => {
      // передаем змейке координаты мыши и флаг ускорения
      snake.move(mousePositionX, mousePositionY, boost)
    }

    let loopId: number | null = null

    const drawMapLoop = () => {
      // очищаем все и рисуем карту заново
      ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT)
      ctx.fillStyle = '#1c1c1c' // фон карты
      ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT)

      snake.draw()

      drawLogs()

      loopId = requestAnimationFrame(drawMapLoop)
    }

    const intervalId = setInterval(sendCoordsLoop, 0)
    drawMapLoop()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      clearInterval(intervalId)
      if (loopId) {
        cancelAnimationFrame(loopId)
      }
    }
  }, [])

  return <canvas ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
}
