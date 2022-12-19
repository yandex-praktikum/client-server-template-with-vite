import { Size, Position } from './GameTypes';
import { BaseObject } from './MovableObject';
import { Scene } from './Scene';

import JumpSprite from '../assets/jump.png';
import RunSprite from '../assets/run.png';
import SlideSprite from '../assets/slide.png';

export class Player extends BaseObject {
  private gravity: number;
  private verDelta: number;
  private jumpForce: number;
  public originalHeight: number;
  private originalWidth: number;
  private minHeight: number;
  private minWidth: number;
  private grounded: boolean;
  private jumpTimer: number;

  private image: HTMLImageElement;

  constructor(position: Position, size: Size) {
    super(position, size);

    this.verDelta = 0;
    this.jumpForce = -20;
    this.originalHeight = size.height;
    this.originalWidth = size.width;
    this.grounded = false;
    this.jumpTimer = 0;
    this.gravity = 1;
    this.minHeight = 90;
    this.minWidth = 116;

    this.image = new Image();
    this.image.src = RunSprite;
  }

  isMoveDownPressed() {
    if (window.keys['ArrowDown']) {
      this.image.src = SlideSprite;
      this.size.height = this.minHeight;
      this.size.width = this.minWidth;
    } else {
      this.image.src = RunSprite;
      this.size.height = this.originalHeight;
      this.size.width = this.originalWidth;
    }
  }

  isMoveUpPressed() {
    if (window.keys['Space'] || window.keys['ArrowUp']) {
      this.jump();
    } else {
      this.jumpTimer = 0;
    }
  }

  update(canvas: Scene) {
    this.isMoveUpPressed();
    this.isMoveDownPressed();

    this.position.yPos += this.verDelta;

    if (this.position.yPos + this.size.height < canvas.height) {
      this.verDelta += this.gravity;
      this.grounded = false;
    } else {
      this.verDelta = 0;
      this.grounded = true;
      this.position.yPos = canvas.height - this.size.height;
    }
  }

  jump() {
    this.image.src = JumpSprite;

    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.verDelta = this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.verDelta = this.jumpForce;
    }
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
