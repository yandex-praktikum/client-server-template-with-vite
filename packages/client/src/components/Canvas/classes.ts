import { Mouse, EnemyTypes, WaypointsType } from './interfaces'
import { offset } from './consts'

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
  health: number
  velocity: {
    x: number
    y: number
  }

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
    this.health = 30
    this.velocity = {
      x: 0,
      y: 0,
    }
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

      this.context.fillStyle = 'red'
      this.context.fillRect(this.x, this.y - 10, this.width, 8)

      this.context.fillStyle = 'green'
      this.context.fillRect(
        this.x,
        this.y - 10,
        (this.width * this.health) / 30,
        8
      )
    }
  }

  update() {
    if (this.context) {
      this.draw()

      const waypoint = this.waypoints[this.waypointIndex]
      const yDistance = waypoint.y - this.y
      const xDistance = waypoint.x - this.x
      const angle = Math.atan2(yDistance, xDistance)

      const speed = 2

      this.velocity.x = Math.cos(angle) * speed
      this.velocity.y = Math.sin(angle) * speed

      this.x += this.velocity.x
      this.y += this.velocity.y

      if (
        Math.abs(Math.round(this.x) - Math.round(waypoint.x)) <
          Math.abs(this.velocity.x) &&
        Math.abs(Math.round(this.y) - Math.round(waypoint.y)) <
          Math.abs(this.velocity.y) &&
        this.waypointIndex < this.waypoints.length - 1
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
    this.size = 32
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
  img: HTMLImageElement
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
    this.img = new Image()
    this.img.src = 'src/assets/game/shot.png'
  }

  draw() {
    if (this.context) {
      this.context.drawImage(this.img, this.x, this.y)

      // this.context.beginPath()
      // this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      // this.context.fillStyle = 'rgb(255,140,0)'
      // this.context.fill()
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
      this.context.fillRect(this.x, this.y, offset * 2, offset)

      this.context.beginPath()
      this.context.arc(
        this.x + (offset * 2) / 2,
        this.y + offset / 2,
        this.radius,
        0,
        Math.PI * 2
      )
      this.context.fillStyle = 'rgba(0,56,176, .1)'
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

export class Sprite {
  x: number
  y: number
  img: HTMLImageElement
  context: CanvasRenderingContext2D | null

  constructor(x: number, y: number, context: CanvasRenderingContext2D | null) {
    this.x = x
    this.y = y
    this.img = new Image()
    this.img.src = 'src/assets/game/shot.png'
    this.context = context
  }

  draw() {
    if (this.context) {
      this.context.drawImage(this.img, this.x, this.y)
    }
  }
}
