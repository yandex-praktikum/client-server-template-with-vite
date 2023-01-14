import { Size, Position, ObstaclesType } from './GameTypes';
import { BaseObject } from './MovableObject';

import Tree from '../assets/pine.png';
import SnowMan from '../assets/snowman.png';

export class Obstacle extends BaseObject {
  private readonly speed: number;
  private horSpeed: number;
  private readonly image: HTMLImageElement;
  private readonly type: number;

  constructor(
    position: Position,
    size: Size,
    speed: number,
    type: number
  ) {
    super(position, size);
    this.speed = speed;
    this.horSpeed = -speed;
    this.type = type;
    this.image = new Image();
  }

  isFlying() {
    if (this.type === ObstaclesType.FlyingObject) {
      this.image.src = Tree;
    } else {
      this.image.src = SnowMan;
    }
  }

  update() {
    this.isFlying();
    this.position.xPos += this.horSpeed;
    this.horSpeed = -this.speed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image,
      this.position.xPos,
      this.position.yPos,
      this.width,
      this.height
    );
  }
}
