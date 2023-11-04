import React, { useRef, useEffect, useState } from 'react'
import { Enemy, TowerPlace, BuildTower } from './classes'
import { BuildPlace, Mouse, TowerPlaceType } from './interfaces'
import { height, width, towersPlace, buildingTower } from './consts'
import s from './canvas.module.scss'

const Canvas: React.FC = () => {
  const endRef = useRef<HTMLDivElement | null>(null)
  const refCanvas = useRef<HTMLCanvasElement | null>(null)
  const [hearts, setHeart] = useState(10)
  const [coins, setCoins] = useState(100)

  const waypoints = [
    {
      x: -74,
      y: 588,
    },
    {
      x: 976,
      y: 588,
    },
    {
      x: 975,
      y: 428,
    },
    {
      x: 304,
      y: 429,
    },
    {
      x: 304,
      y: 270,
    },
    {
      x: 1337,
      y: 269,
    },
  ]
  const towerPlaceInit = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8,
    0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8,
    0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
    0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0,
    0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 0, 8, 0, 8, 0, 8,
    0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 8, 0, 8, 0, 8, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8,
    0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0,
    8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8,
    0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0,
    8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0, 8,
    0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]

  const towerPlace2D: any = []
  const towerPlace: any = []

  useEffect(() => {
    const enemies: Enemy[] = []
    let activeBuildPlace: BuildPlace | TowerPlaceType | null
    let enemiesCounter = 3
    let animationFrame = 0
    let newHearts = hearts
    let newCoins = coins
    let endGame = false
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

    const img = new Image()
    img.src = 'src/assets/game/map.png'
    img.onload = () => {
      context.drawImage(img, 0, 0)
    }

    for (let i = 0; i < towerPlaceInit.length; i += 40) {
      towerPlace2D.push(towerPlaceInit.slice(i, i + 40))
    }

    towerPlace2D.forEach((item: [], y: number) => {
      item.forEach((el, x: number) => {
        if (el === 8) {
          towerPlace.push(new TowerPlace(x * 32, y * 32, context))
        }
      })
    })

    function spawnEnemies(enemiesCount: number) {
      for (let i = 1; i < enemiesCount + 1; i++) {
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
    }
    spawnEnemies(enemiesCounter)

    for (let i = 0; i < towerPlace.length; i++) {
      towersPlace.push(
        new TowerPlace(towerPlace[i].x, towerPlace[i].y, context)
      )
    }

    const updateAnimation = function () {
      context.clearRect(0, 0, width, height)

      context.drawImage(img, 0, 0)

      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()

        if (enemy.x > canvas.width) {
          newHearts -= 1
          setHeart(newHearts)
          enemies.splice(i, 1)
          if (newHearts === 0 && endRef.current) {
            endGame = true
            endRef.current.style.display = 'flex'
          }
        }
      }
      if (enemies.length === 0) {
        enemiesCounter += 2
        spawnEnemies(enemiesCounter)
      }

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
            shot.enemy.health -= 5
            if (shot.enemy.health <= 0) {
              const enemyIndex = enemies.findIndex(enemy => {
                return shot.enemy === enemy
              })
              if (enemyIndex > -1) {
                enemies.splice(enemyIndex, 1)
                newCoins += 50
                setCoins(newCoins)
              }
            }

            building.shots.splice(i, 1)
          }
        }
      })

      if (!endGame) {
        animationFrame = requestAnimationFrame(updateAnimation)
      }
    }

    const buildTowerHandler = () => {
      if (
        activeBuildPlace &&
        !(activeBuildPlace as BuildPlace).isOccupied &&
        newCoins - 50 >= 0
      ) {
        newCoins -= 50
        setCoins(newCoins)
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

      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div className={s.wrap}>
      <canvas width={800} height={450} ref={refCanvas} />
      <div ref={endRef} className={s.end_game}>
        Конец игры
      </div>
      <div className={s.heats}>{hearts}</div>
      <div className={s.coins}>{coins}</div>
    </div>
  )
}

export default Canvas
