import React, { useRef, useEffect, useState } from 'react'
import { Enemy, TowerPlace, BuildTower } from './classes'
import { BuildPlace, Mouse, TowerPlaceType } from './interfaces'
import {
  heightCanvas,
  widthCanvas,
  towersPlace,
  buildingTower,
  WAY_POINTS,
  TOWER_PLACE_INIT,
} from './consts'
import s from './canvas.module.scss'

const Canvas: React.FC = () => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null)

  const [hearts, setHeart] = useState(10)
  const [coins, setCoins] = useState(100)
  const [startNewGame, setStartNewGame] = useState(false)
  const [wayCounterIn, setWayCounterIn] = useState(0)
  const [enemyDeadCounter, setEnemyDeadCounter] = useState(0)
  const [endGame, setEndGame] = useState(false)

  const towerPlace2D: any = []
  const towerPlace: any = []

  const startGame = () => {
    setStartNewGame(true)
  }
  const reStartGame = () => {
    setStartNewGame(false)
    setTimeout(() => {
      setStartNewGame(true)
      setEndGame(false)
      setCoins(100)
      setHeart(10)
      setWayCounterIn(0)
      setEnemyDeadCounter(0)
    }, 100)
  }

  useEffect(() => {
    const enemies: Enemy[] = []
    let activeBuildPlace: BuildPlace | TowerPlaceType | null
    let enemiesCounter = 3
    let animationFrame = 0
    let newHearts = hearts
    let newCoins = coins
    let endGame = false
    let wayCounter = wayCounterIn
    let enemyDead = enemyDeadCounter

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

    canvas.height = heightCanvas
    canvas.width = widthCanvas

    const img = new Image()
    img.src = 'src/assets/game/map.png'
    img.onload = () => {
      if (startNewGame) {
        updateAnimation()
      }
      context.drawImage(img, 0, 0)
    }

    for (let i = 0; i < TOWER_PLACE_INIT.length; i += 40) {
      towerPlace2D.push(TOWER_PLACE_INIT.slice(i, i + 40))
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
            WAY_POINTS[0].x - offset * i,
            WAY_POINTS[0].y,
            context,
            WAY_POINTS
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
      context.clearRect(0, 0, widthCanvas, heightCanvas)

      context.drawImage(img, 0, 0)

      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()

        if (enemy.x > canvas.width) {
          newHearts -= 1
          setHeart(newHearts)
          enemies.splice(i, 1)
          if (newHearts === 0) {
            enemies.splice(0, enemies.length)
            buildingTower.splice(0, buildingTower.length)
            setTimeout(() => {
              endGame = true
              setEndGame(true)
            }, 100)
          }
        }
      }
      if (enemies.length === 0) {
        enemiesCounter += 2
        wayCounter += 1
        spawnEnemies(enemiesCounter)
        setWayCounterIn(wayCounter)
      }

      towersPlace.forEach(tower => {
        tower.update(mouse)
      })

      buildingTower.forEach(building => {
        building.update(mouse)

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
                enemyDead++
                setEnemyDeadCounter(enemyDead)
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
        buildingTower.sort((a, b) => {
          return a.y - b.y
        })
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

    return () => {
      canvas.removeEventListener('click', buildTowerHandler)
      window.removeEventListener('mousemove', mouseActiveBuildPlace)

      if (animationFrame !== 0) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [startNewGame])

  return (
    <div className={s.wrap}>
      {!startNewGame && (
        <div className={s.wrap_start}>
          <button className={`button form-button`} onClick={startGame}>
            начать игру
          </button>
        </div>
      )}
      <div className={s.info}>
        <div>противников убито: {enemyDeadCounter}</div>
        <div className={s.way}>волна: {wayCounterIn}</div>
        <div className={s.coins}>
          <img src="src/assets/game/coins.svg" alt="coins" />
          <span>{coins}</span>
        </div>
        <div className={s.heats}>
          <img src="src/assets/game/heart.svg" alt="heart" />
          <span>{hearts}</span>
        </div>
      </div>

      <canvas width={800} height={450} ref={refCanvas} />
      {endGame && (
        <div className={s.end_game}>
          <div>Конец игры</div>
          <button className={`button form-button`} onClick={reStartGame}>
            новая игра
          </button>
        </div>
      )}
    </div>
  )
}

export default Canvas
