import { randomIntInRange, randomArbitrary } from './helpers';
import { Legend } from './Legend';
import { BaseObject } from './MovableObject';
import { Obstacle } from './Obstacle';
import { Player } from './Player';
import { Scene } from './Scene';

declare global {
  interface Window {
    keys: any;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  window.keys = {};
});
document.addEventListener('keydown', function (evt) {
  window.keys[evt.code] = true;
});
document.addEventListener('keyup', function (evt) {
  window.keys[evt.code] = false;
});

export class Game {
  private scene: Scene;
  private context: CanvasRenderingContext2D;
  private player!: Player;
  private obstacles: Obstacle[] = [];

  private score!: number;
  private scoreText!: Legend;
  private highscore = 0;
  private highscoreText!: Legend;
  private gameSpeed!: number;
  private initialGenerateTimer!: number;
  private generateTimer = this.initialGenerateTimer;
  private initialPlayerWidth = 100;
  private initialPlayerHeight = 112;

  constructor(canvas: Scene, context: CanvasRenderingContext2D) {
    this.scene = canvas;
    this.context = context;
  }

  generateObstacle = () => {
    const len = randomIntInRange(50, 130);
    const isGroundType = randomIntInRange(0, 1);
    const coeff = randomArbitrary(0.25, 1.15);

    let obstacle: Obstacle;

    if (isGroundType) {
      const obstacleW = coeff * 200;
      const obstacleH = coeff * 258;
      obstacle = new Obstacle(
        {
          xPos: this.scene.width + obstacleW,
          yPos: this.scene.height - obstacleH - this.initialPlayerHeight + 20,
        },
        { width: obstacleW, height: obstacleH },
        this.gameSpeed,
        isGroundType
      );
    } else {
      obstacle = new Obstacle(
        {
          xPos: this.scene.width + len,
          yPos: this.scene.height - len,
        },
        { width: len, height: len },
        this.gameSpeed,
        isGroundType
      );
    }

    this.obstacles.push(obstacle);
  };

  generatePlayer = () => {
    this.player = new Player(
      { xPos: 25, yPos: 0 },
      { width: this.initialPlayerWidth, height: this.initialPlayerHeight }
    );
  };

  generateLegend = () => {
    this.scoreText = new Legend(
      { xPos: 60, yPos: 60 },
      'Score: ' + this.score,
      20
    );
    this.highscoreText = new Legend(
      { xPos: 60, yPos: 25 },
      'Highscore: ' + this.highscore,
      20
    );
  };

  isCollisionDetected(obj1: BaseObject, obj2: BaseObject): boolean {
    let result = false;

    if (
      obj1.xPos < obj2.xPos + obj2.width - 30 &&
      obj1.xPos + obj1.width - 10 > obj2.xPos &&
      obj1.yPos < obj2.yPos + obj2.height - 10 &&
      obj1.yPos + obj1.height - 30 > obj2.yPos
    ) {
      result = true;
    }

    return result;
  }

  initGame() {
    this.obstacles = [];
    this.score = 0;
    this.gameSpeed = 3;
    this.initialGenerateTimer = 200;
    this.generateTimer = this.initialGenerateTimer;
  }

  showEndGame = () => {
    // TODO: here needs to be the logic to handle end of game
    this.start();
  };

  start = () => {
    this.initGame();
    this.generatePlayer();
    this.generateLegend();
    this.draw();
  };

  private draw = () => {
    const reqId = requestAnimationFrame(this.draw);
    this.scene.draw(this.context);

    this.generateTimer--;

    if (this.generateTimer <= 0) {
      this.generateObstacle();

      this.generateTimer = this.initialGenerateTimer - this.gameSpeed * 8;

      if (this.generateTimer < 60) {
        this.generateTimer = 60;
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const o = this.obstacles[i];

      if (o.xPos + o.width < 0) {
        this.obstacles.splice(i, 1);
      }

      if (this.isCollisionDetected(this.player, o)) {
        cancelAnimationFrame(reqId);
        this.showEndGame();
      }

      o.update();
      o.draw(this.context);
    }

    this.player.update(this.scene);
    this.player.draw(this.context);
    this.gameSpeed += 0.003;

    this.score++;
    this.scoreText.update('Score: ' + this.score);
    this.scoreText.draw(this.context);

    if (this.score > this.highscore) {
      this.highscore = this.score;
      this.highscoreText.update('Highscore: ' + this.highscore);
    }

    this.highscoreText.draw(this.context);
  };
}
