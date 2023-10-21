import React, { useRef, useEffect } from 'react'

interface Mouse {
  x: number
  y: number
}
interface EnemyTypes {
  x: number
  y: number
  height: number
  width: number
  waypointIndex: number
  center: { x: number; y: number }
  radius: number
}

type TowerPlaceType = {
  x: number
  y: number
  size: number
  color: string
  occupied: boolean
}
type BuildPlace = {
  x: number
  y: number
  isOccupied: boolean
}

const Canvas: React.FC = () => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = refCanvas.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const waypoints = [
      { x: 0, y: 210 },
      { x: 800, y: 210 },
    ]
    const towerPlace = [
      { x: 250, y: 100 },
      { x: 350, y: 100 },
      { x: 450, y: 100 },
    ]

    const height = 450
    const width = 800

    canvas.height = height
    canvas.width = width

    const offset = 50

    class Rect {
      x: number
      y: number
      color: string
      w: number
      h: number
      active: boolean
      center: { x: number; y: number }

      constructor(x: number, y: number, w: number, h: number, color: string) {
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
        if (context) {
          this.draw(context)
        }
      }
    }

    class Enemy {
      x: number
      y: number
      height: number
      width: number
      waypointIndex: number
      center: { x: number; y: number }
      radius: number

      constructor(x: number, y: number) {
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
      }

      draw(context: CanvasRenderingContext2D) {
        if (context) {
          const localContext = context

          localContext.fillStyle = 'red'
          localContext.beginPath()
          localContext.arc(
            this.center.x,
            this.center.y,
            this.radius,
            0,
            Math.PI * 2
          )
          localContext.fill()
        }
      }

      update() {
        if (context) {
          this.draw(context)

          const waypoint = waypoints[this.waypointIndex]
          const yDistance = waypoint.y - this.y
          const xDistance = waypoint.x - this.x
          const angle = Math.atan2(yDistance, xDistance)

          this.x += Math.cos(angle)
          this.y += Math.sin(angle)

          if (
            Math.round(this.x) === Math.round(waypoint.x) &&
            Math.round(this.y) === Math.round(waypoint.y) &&
            this.waypointIndex !== waypoints.length
          ) {
            this.waypointIndex++
          }

          //надо будет переделать. не правильно выходит из игры враг
          if (this.waypointIndex === waypoints.length) {
            this.waypointIndex = 0
            this.x = 0
          }

          this.center = {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
          }
        }
      }
    }

    class TowerPlace {
      x: number
      y: number
      size: number
      color: string
      occupied: boolean

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = 50
        this.color = 'rgba(255,255,255,0.6)'
        this.occupied = false
      }

      draw() {
        if (context) {
          context.fillStyle = this.color
          context.fillRect(this.x, this.y, this.size, this.size)
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

    class Shot {
      x: number
      y: number
      enemy: EnemyTypes
      velocity: {
        x: number
        y: number
      }
      radius: number

      constructor(x: number, y: number, enemy: EnemyTypes) {
        this.x = x
        this.y = y
        this.velocity = {
          x: 0,
          y: 0,
        }
        this.enemy = enemy
        this.radius = 5
      }

      draw() {
        if (context) {
          context.beginPath()
          context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
          context.fillStyle = 'rgb(255,140,0)'
          context.fill()
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

    class BuildTower {
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

      constructor(x: number, y: number) {
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
      }
      draw() {
        if (context) {
          context.fillStyle = 'rgb(0,56,176)'
          context.fillRect(this.x, this.y, offset, offset)

          context.beginPath()
          context.arc(
            this.x + offset / 2,
            this.y + offset / 2,
            this.radius,
            0,
            Math.PI * 2
          )
          context.fillStyle = 'rgba(0,56,176, .5)'
          context.fill()
        }
      }
      update() {
        if (context) {
          this.draw()
          if (this.frames % 100 === 0 && this.target) {
            this.shots.push(new Shot(this.center.x, this.center.y, this.target))
          }

          this.frames++
        }
      }
    }

    function createGameArea() {
      for (let i = 0; i < width / offset; i++) {
        for (let t = 0; t < height / offset; t++) {
          const rect = new Rect(
            i * offset,
            t * offset,
            offset,
            offset,
            'rgba(24,83,98,0.4)'
          )
          if (context) {
            rect.draw(context)
          }
        }
      }
    }

    function createGamePath() {
      for (let i = 0; i < width / offset; i++) {
        const rect = new Rect(i * offset, 200, offset, offset, 'rgb(26,243,68)')
        if (context) {
          rect.draw(context)
        }
      }
    }

    const enemies: Enemy[] = []
    const towersPlace: TowerPlace[] = []
    const buildingTower: BuildTower[] = []

    let activeBuildPlace: BuildPlace | TowerPlaceType | null

    for (let i = 0; i < 5; i++) {
      const offset = 150
      enemies.push(new Enemy(waypoints[0].x - offset * i, waypoints[0].y))
    }

    for (let i = 0; i < towerPlace.length; i++) {
      towersPlace.push(new TowerPlace(towerPlace[i].x, towerPlace[i].y))
    }

    const updateAnimation = function () {
      context.clearRect(0, 0, width, height)

      createGameArea()
      createGamePath()

      enemies.forEach(enemy => {
        enemy.update()
      })

      towersPlace.forEach(tower => {
        tower.update(mouse)
      })

      buildingTower.forEach(building => {
        building.update()
        // eslint-disable-next-line
        building.target = null

        const validEnemies = enemies.filter(enemy => {
          const xDiff = enemy.center.x - building.center.x
          const yDiff = enemy.center.y - building.center.y
          const distance = Math.hypot(xDiff, yDiff)
          return distance < enemy.radius + building.radius
        })
        // eslint-disable-next-line
        building.target = validEnemies[0]

        for (let i = building.shots.length - 1; i >= 0; i--) {
          const shot = building.shots[i]

          shot.update()

          const xDiff = shot.enemy.center.x - shot.x
          const yDiff = shot.enemy.center.y - shot.y
          const distance = Math.hypot(xDiff, yDiff)
          if (distance < shot.enemy.radius + shot.radius) {
            building.shots.splice(i, 1)
          }
        }
      })

      requestAnimationFrame(updateAnimation)
    }

    const mouse: Mouse = {
      x: 0,
      y: 0,
    }

    canvas.addEventListener('click', () => {
      if (activeBuildPlace && !(activeBuildPlace as BuildPlace).isOccupied) {
        buildingTower.push(
          new BuildTower(activeBuildPlace.x, activeBuildPlace.y)
        )
        ;(activeBuildPlace as BuildPlace).isOccupied = true
      }
    })

    window.addEventListener('mousemove', (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      activeBuildPlace = null

      for (let i = 0; i < towersPlace.length; i++) {
        const tower = towersPlace[i]
        if (
          mouse.x > tower.x &&
          mouse.x < tower.x + tower.size &&
          mouse.y > tower.y &&
          mouse.y < tower.y + tower.size
        ) {
          activeBuildPlace = tower
          break
        }
      }
    })

    updateAnimation()
  }, [])

  return <canvas width={800} height={450} ref={refCanvas} />
}

export default Canvas
