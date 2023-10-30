import React, { useRef, useEffect } from 'react'
import { Rect, Enemy, TowerPlace, BuildTower } from './classes'
import { BuildPlace, Mouse, TowerPlaceType } from './interfaces'
import { height, width, offset, towersPlace, buildingTower } from './consts'

const Canvas: React.FC = () => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  let stopGame = false

  const waypoints = [
    { x: 0, y: 210 },
    { x: 800, y: 210 },
    { x: 850, y: 210 },
    { x: 900, y: 210 },
  ]
  const towerPlace = [
    { x: 250, y: 100 },
    { x: 350, y: 100 },
    { x: 450, y: 100 },
  ]

  useEffect(() => {
    const enemies: Enemy[] = []
    let animationFrame = 0
    let activeBuildPlace: BuildPlace | TowerPlaceType | null
    const mouse: Mouse = {
      x: 0,
      y: 0,
    }

    const canvas = refCanvas.current
    if (!canvas) {
      return
    }
    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    canvas.height = height
    canvas.width = width

    function createGameArea() {
      for (let i = 0; i < width / offset; i++) {
        for (let t = 0; t < height / offset; t++) {
          const rect = new Rect(
            i * offset,
            t * offset,
            offset,
            offset,
            'rgba(24,83,98,0.4)',
            context
          )
          if (context) {
            rect.draw(context)
          }
        }
      }
    }

    function createGamePath() {
      for (let i = 0; i < width / offset; i++) {
        const rect = new Rect(
          i * offset,
          200,
          offset,
          offset,
          'rgb(26,243,68)',
          context
        )
        if (context) {
          rect.draw(context)
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const offset = 150
      enemies.push(
        new Enemy(
          waypoints[0].x - offset * i,
          waypoints[0].y,
          context,
          waypoints
        )
      )
    }

    for (let i = 0; i < towerPlace.length; i++) {
      towersPlace.push(
        new TowerPlace(towerPlace[i].x, towerPlace[i].y, context)
      )
    }

    const updateAnimation = function () {
      if (stopGame) {
        return
      }
      context.clearRect(0, 0, width, height)

      createGameArea()
      createGamePath()

      enemies.forEach(enemy => {
        enemy.update()

        if (enemy.x === width) {
          // пока это условный конец игры когда враг доходит из точки А в точнку Б
          stopGame = true
        }
      })

      towersPlace.forEach(tower => {
        tower.update(mouse)
      })

      buildingTower.forEach(building => {
        building.update()

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

      animationFrame = requestAnimationFrame(updateAnimation)
    }

    const buildTowerHandler = () => {
      if (activeBuildPlace && !(activeBuildPlace as BuildPlace).isOccupied) {
        buildingTower.push(
          new BuildTower(activeBuildPlace.x, activeBuildPlace.y, context)
        )
        ;(activeBuildPlace as BuildPlace).isOccupied = true
      }
    }

    const mouseActiveBuildPlace = (e: MouseEvent) => {
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
    }

    canvas.addEventListener('click', buildTowerHandler)
    window.addEventListener('mousemove', mouseActiveBuildPlace)

    updateAnimation()

    return () => {
      canvas.removeEventListener('click', buildTowerHandler)
      window.removeEventListener('mousemove', mouseActiveBuildPlace)

      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas width={800} height={450} ref={refCanvas} />
}

export default Canvas
