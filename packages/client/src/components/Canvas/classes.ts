import { Mouse, EnemyTypes, WaypointsType } from './interfaces'
import { offset } from './consts'

export class Rect {
  x: number
  y: number
  color: string
  w: number
  h: number
  active: boolean
  center: { x: number; y: number }
  context: CanvasRenderingContext2D | null

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    context: CanvasRenderingContext2D | null
  ) {
    this.x = x
    this.y = y
    this.color = color

    this.w = w
    this.h = h

    this.active = true

    this.center = {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2,
    }
    this.context = context
  }

  draw(context: CanvasRenderingContext2D) {
    const localContext = context

    localContext.beginPath()

    localContext.fillStyle = this.color
    localContext.fillRect(this.x, this.y, this.w, this.h)

    localContext.fillStyle = 'rgba(1,1,1,0.5)'
    localContext.strokeRect(this.x, this.y, this.w, this.h)

    localContext.closePath()
  }

  update() {
    if (this.context) {
      this.draw(this.context)
    }
  }
}

export class Enemy {
  x: number
  y: number
  height: number
  width: number
  waypointIndex: number
  center: { x: number; y: number }
  radius: number
  context: CanvasRenderingContext2D | null
  waypoints: WaypointsType[]

  constructor(
    x: number,
    y: number,
    context: CanvasRenderingContext2D | null,
    waypoints: WaypointsType[]
  ) {
    this.x = x
    this.y = y
    this.height = 30
    this.width = 30
    this.waypointIndex = 0
    this.center = {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    }
    this.radius = 15
    this.context = context
    this.waypoints = waypoints
  }

  draw() {
    if (this.context) {
      this.context.fillStyle = 'red'
      this.context.beginPath()
      this.context.arc(
        this.center.x,
        this.center.y,
        this.radius,
        0,
        Math.PI * 2
      )
      this.context.fill()
    }
  }

  update() {
    if (this.context) {
      this.draw()

      const waypoint = this.waypoints[this.waypointIndex]
      const yDistance = waypoint.y - this.y
      const xDistance = waypoint.x - this.x
      const angle = Math.atan2(yDistance, xDistance)

      this.x += Math.cos(angle)
      this.y += Math.sin(angle)

      if (
        Math.round(this.x) === Math.round(waypoint.x) &&
        Math.round(this.y) === Math.round(waypoint.y) &&
        this.waypointIndex !== this.waypoints.length - 1
      ) {
        this.waypointIndex++
      }

      this.center = {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
      }
    }
  }
}

export class TowerPlace {
  x: number
  y: number
  size: number
  color: string
  occupied: boolean
  context: CanvasRenderingContext2D | null

  constructor(x: number, y: number, context: CanvasRenderingContext2D | null) {
    this.x = x
    this.y = y
    this.size = 50
    this.color = 'rgba(255,255,255,0.6)'
    this.occupied = false
    this.context = context
  }

  draw() {
    if (this.context) {
      this.context.fillStyle = this.color
      this.context.fillRect(this.x, this.y, this.size, this.size)
    }
  }

  update(mouse: Mouse) {
    this.draw()
    if (
      mouse.x > this.x &&
      mouse.x < this.x + this.size &&
      mouse.y > this.y &&
      mouse.y < this.y + this.size
    ) {
      this.color = 'white'
    } else {
      this.color = 'rgba(255,255,255,0.6)'
    }
  }
}

export class Shot {
  x: number
  y: number
  enemy: EnemyTypes
  velocity: {
    x: number
    y: number
  }
  radius: number
  context: CanvasRenderingContext2D | null

  constructor(
    x: number,
    y: number,
    enemy: EnemyTypes,
    context: CanvasRenderingContext2D | null
  ) {
    this.x = x
    this.y = y
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.enemy = enemy
    this.radius = 5
    this.context = context
  }

  draw() {
    if (this.context) {
      this.context.beginPath()
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      this.context.fillStyle = 'rgb(255,140,0)'
      this.context.fill()
    }
  }

  update() {
    this.draw()

    const angle = Math.atan2(
      this.enemy.center.y - this.y,
      this.enemy.center.x - this.x
    )

    const power = 3
    this.velocity.x = Math.cos(angle) * power
    this.velocity.y = Math.sin(angle) * power

    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}

export class BuildTower {
  x: number
  y: number
  center: {
    x: number
    y: number
  }
  shots: Shot[]
  radius: number
  target: EnemyTypes | null = null
  frames: number
  context: CanvasRenderingContext2D | null

  constructor(x: number, y: number, context: CanvasRenderingContext2D | null) {
    this.x = x
    this.y = y
    this.center = {
      x: this.x + offset / 2,
      y: this.y + offset / 2,
    }
    this.shots = []
    this.radius = 200
    this.target
    this.frames = 0
    this.context = context
  }
  draw() {
    if (this.context) {
      this.context.fillStyle = 'rgb(0,56,176)'
      this.context.fillRect(this.x, this.y, offset, offset)

      this.context.beginPath()
      this.context.arc(
        this.x + offset / 2,
        this.y + offset / 2,
        this.radius,
        0,
        Math.PI * 2
      )
      this.context.fillStyle = 'rgba(0,56,176, .5)'
      this.context.fill()
    }
  }
  update() {
    if (this.context) {
      this.draw()
      if (this.frames % 100 === 0 && this.target) {
        this.shots.push(
          new Shot(this.center.x, this.center.y, this.target, this.context)
        )
      }

      this.frames++
    }
  }
}
