import { BuildTower, Enemy, TowerPlace } from './classes'
import { Mouse } from './interfaces'

export const waypoints = [
  { x: 0, y: 210 },
  { x: 800, y: 210 },
  { x: 850, y: 210 },
  { x: 900, y: 210 },
]
export const towerPlace = [
  { x: 250, y: 100 },
  { x: 350, y: 100 },
  { x: 450, y: 100 },
]

export const height = 450
export const width = 800
export const offset = 50

export const enemies: Enemy[] = []
export const towersPlace: TowerPlace[] = []
export const buildingTower: BuildTower[] = []

export const mouse: Mouse = {
  x: 0,
  y: 0,
}
