import Background from '../assets/bg.png';

export class Scene {
  private readonly image: HTMLImageElement;
  private x: number;
  private _initialDimensions: [number, number];
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.x = 0;
    this._initialDimensions = [width, height];

    this.image = new Image();
    this.image.src = Background;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get initialDimensions(): [number, number] {
    return this._initialDimensions;
  }

  updateDimensions(dimensions: [number, number]) {
    [this._width, this._height] = dimensions;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height); //TODO: separate Scene from obj

    ctx.drawImage(this.image, this.x--, 0, this.width * 2, this.height);

    if (this.x <= -this.width) {
      this.x = 0;
    }
  }
}
