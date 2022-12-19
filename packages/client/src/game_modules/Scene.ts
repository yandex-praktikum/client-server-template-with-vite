import Background from '../assets/bg.png';

export class Scene {
  private _width: number;
  private _height: number;
  private image: HTMLImageElement;
  private x: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.x = 0;

    this.image = new Image();
    this.image.src = Background;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.drawImage(this.image, this.x--, 0, this.width * 2, this.height);

    if (this.x <= -this.width) {
      this.x = 0;
    }
  }
}
