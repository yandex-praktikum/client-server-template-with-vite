import { Size, Position } from './GameTypes';

export class BaseObject {
  protected position: Position;
  protected size: Size;

  constructor(position: Position, size: Size) {
    this.position = position;
    this.size = size;
  }

  get width(): number {
    return this.size.width;
  }

  get height(): number {
    return this.size.height;
  }

  get xPos(): number {
    return this.position.xPos;
  }

  get yPos(): number {
    return this.position.yPos;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillRect(
      this.position.xPos,
      this.position.yPos,
      this.size.width,
      this.size.height
    );
    ctx.closePath();
  }
}
