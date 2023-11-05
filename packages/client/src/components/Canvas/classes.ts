import { Mouse, EnemyTypes, WaypointsType } from './interfaces'
import { enemy_left, enemy_right, offsetCanvasRect } from './consts'

export class Sprite {
  x: number
  y: number
  img: HTMLImageElement
  context: CanvasRenderingContext2D | null
  frames: {
    max: number
    current: number
    elapsed: number
    hold: number
  }
  offset: {
    x: number
    y: number
  }
  constructor(
    x: number,
    y: number,
    context: CanvasRenderingContext2D | null,
    imgSrc: string,
    frames = { max: 1 },
    offset = { x: 0, y: 0 }
  ) {
    this.x = x
    this.y = y
    this.img = new Image()
    this.img.src = imgSrc
    this.context = context
    this.frames = {
      max: frames.max,
      current: 0,
      elapsed: 0,
      hold: 6,
    }
    this.offset = offset
  }

  draw() {
    if (this.context) {
      const cutWidth = this.img.width / this.frames.max
      const cut = {
        x: cutWidth * this.frames.current,
        y: 0,
        width: cutWidth,
        height: this.img.height,
      }

      this.context.drawImage(
        this.img,
        cut.x,
        cut.y,
        cut.width,
        cut.height,
        this.x + this.offset.x,
        this.y + this.offset.y,
        cut.width,
        cut.height
      )

      this.frames.elapsed++
      if (this.frames.elapsed % this.frames.hold === 0) {
        this.frames.current++
        if (this.frames.current >= this.frames.max - 1) {
          this.frames.current = 0
        }
      }
    }
  }
  updateSprite(newSrcImg: string) {
    this.img.src = newSrcImg
  }
}
export class Enemy extends Sprite {
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
    super(x, y, context, 'src/assets/game/enemy.png', { max: 4 })
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
      super.draw()

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

      const prevPostWay = {
        prev: this.waypoints[this.waypointIndex - 1],
        post: this.waypoints[this.waypointIndex],
      }

      if (
        prevPostWay.prev !== undefined &&
        prevPostWay.post !== undefined &&
        prevPostWay.post.x < prevPostWay.prev.x
      ) {
        super.updateSprite(enemy_left)
      } else {
        super.updateSprite(enemy_right)
      }

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
    this.color = 'rgba(255,255,255,0.05)'
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
      this.color = 'rgba(255,255,255,0.05)'
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

export class BuildTower extends Sprite {
  x: number
  y: number
  center: {
    x: number
    y: number
  }
  shots: Shot[]
  radius: number
  target: EnemyTypes | null = null
  spawnTime: number
  context: CanvasRenderingContext2D | null

  constructor(x: number, y: number, context: CanvasRenderingContext2D | null) {
    super(
      x,
      y,
      context,
      'src/assets/game/tower.png',
      { max: 6 },
      { x: 0, y: -90 }
    )
    this.x = x
    this.y = y
    this.center = {
      x: this.x + offsetCanvasRect / 2,
      y: this.y + offsetCanvasRect / 2,
    }
    this.shots = []
    this.radius = 200
    this.target
    this.spawnTime = 0
    this.context = context
  }
  draw() {
    if (this.context) {
      super.draw()
    }
  }
  update(mouse: Mouse) {
    if (this.context) {
      this.draw()
      if (this.spawnTime % 100 === 0 && this.target) {
        this.shots.push(
          new Shot(this.center.x, this.center.y, this.target, this.context)
        )
      }

      this.spawnTime++

      if (
        mouse.x > this.x &&
        mouse.x < this.x + offsetCanvasRect * 2 &&
        mouse.y > this.y &&
        mouse.y < this.y + offsetCanvasRect
      ) {
        this.context.beginPath()
        this.context.arc(
          this.x + (offsetCanvasRect * 2) / 2,
          this.y + offsetCanvasRect / 2,
          this.radius,
          0,
          Math.PI * 2
        )
        this.context.fillStyle = 'rgba(0,56,176, .1)'
        this.context.fill()
      }
    }
  }
}
