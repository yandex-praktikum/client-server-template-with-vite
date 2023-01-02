import { Position } from './GameTypes';

export class Legend {
  private _position: Position;
  private _text: string;
  private readonly _fontSize: number;

  constructor(
    position: Position,
    text: string,
    fontSize: number,
  ) {
    this._position = position;
    this._text = text;
    this._fontSize = fontSize;
  }

  update(text: string) {
    this._text = text;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.font = this._fontSize + 'px sans-serif';
    ctx.fillText(this._text, this._position.xPos, this._position.yPos);
    ctx.closePath();
  }
}
