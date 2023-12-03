export interface Mouse {
  x: number
  y: number
}

export interface EnemyTypes {
  x: number
  y: number
  height: number
  width: number
  waypointIndex: number
  center: { x: number; y: number }
  radius: number
  health: number
}

export type TowerPlaceType = {
  x: number
  y: number
  size: number
  color: string
  occupied: boolean
}

export type BuildPlace = {
  x: number
  y: number
  isOccupied: boolean
}

export type WaypointsType = {
  x: number
  y: number
}
