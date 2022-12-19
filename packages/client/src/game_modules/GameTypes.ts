export type Position = {
  xPos: number;
  yPos: number;
};

export type Size = {
  width: number;
  height: number;
};

export enum ObstaclesType {
  GroundObject = 0,
  FlyingObject = 1,
}
