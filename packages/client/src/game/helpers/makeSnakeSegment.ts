import { TSnakeColor } from '../Snake.types'

// Создает рисунок одного кружочка змейки
export const makeSnakeSegment = (size: number, color: TSnakeColor) => {
  const SHADOW_SIZE = 6

  const canvas = document.createElement('canvas')
  canvas.width = size * 2
  canvas.height = size * 2

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.fillStyle = color
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2

  ctx.shadowColor = 'black'
  ctx.shadowBlur = SHADOW_SIZE

  ctx.beginPath()
  ctx.arc(
    canvas.width * 0.5,
    canvas.height * 0.5,
    size - SHADOW_SIZE ,
    0,
    Math.PI * 2
  )
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  return canvas
}
