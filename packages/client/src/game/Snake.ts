import { BOOST_SPEED, SPEED, SIZE_BETWEEN_SEGMENTS } from '../../../shared/consts';
import { TSnakeColor } from '../../../shared/types';
import { getDistanceBetweenTwoPoints } from '../../../shared/utils';
import { drawPlayerSnake } from '../canvas/drawers/drawPlayerSnake';
import { makeSnakeSegment } from '../canvas/makers/makeSnakeSegment';
import { SNAKE_REDUCTION_TIME } from '../consts/settings';

export class Snake {
  // Флаг для откусывания жопки по таймауту
  isActiveTimeOut = false;
  // позиция головы змейки по горизонтали
  x: number;
  // позиция головы змейки по вертикали
  y: number;
  // контекст канваса, на котором необходимо нарисовать змейку
  private readonly ctx: CanvasRenderingContext2D;
  // размер змейки (по масштабу)
  r: number;
  // массив колец змейки с координатами расположения
  segments: {
    x: number;
    y: number;
  }[];
  // canvas с рисунком 1 кольца
  private readonly canvasSegment: HTMLCanvasElement;
  private readonly color: TSnakeColor;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    color?: TSnakeColor,
    initialSnakeLength = 20,
    size = 24
  ) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.r = size;
    this.segments = [];
    this.color = color || 'red';

    for (let i = 0; i < initialSnakeLength; i++) {
      this.segments.push({
        x,
        y,
      });
    }

    setInterval(() => this.decreaseLength(), SNAKE_REDUCTION_TIME);

    this.canvasSegment = makeSnakeSegment(this.r, this.color, 1);
  }

  increaseLength() {
    this.segments.push(this.segments[this.segments.length - 1]);
  }

  decreaseLength() {
    if (this.segments.length > 2 && this.isActiveTimeOut) {
      this.segments.pop();
      this.isActiveTimeOut = false;
    }
  }

  move(x: number, y: number, boost = false) {
    const distanceToMouse = getDistanceBetweenTwoPoints({ x: this.x, y: this.y }, { x, y });

    // Если голова достигла курсора мыши, то змейка останавливается и пересчитывать ее кординаты не нужно
    if (distanceToMouse < this.r / 2) {
      this.isActiveTimeOut = true;

      return;
    }

    this.isActiveTimeOut = false;

    const speed = boost ? BOOST_SPEED : SPEED;

    // Вычисления по формулам для нахождения прямой от головы змейки до курсора
    // На этой прямой находятся координаты x и y для следующего шага змейки
    const deltaAngle = Math.atan2(y - this.y, x - this.x);

    this.x = this.x + Math.cos(deltaAngle) * speed;
    this.y = this.y + Math.sin(deltaAngle) * speed;

    const distanceFromHeadToTail = getDistanceBetweenTwoPoints(this.segments[0], { x: this.x, y: this.y });

    // Если голова змейки не прошла необходимое минимальное расстояние,
    // то элементы хвоста змеи оставляем на тех же местах
    if (distanceFromHeadToTail < SIZE_BETWEEN_SEGMENTS) {
      return;
    } else {
      // Иначе смещаем каждый элемент змейки ближе к голове
      const newSegments = [];

      for (let i = 1; i < this.segments.length; i++) {
        const cur = this.segments[i];
        const prev = this.segments[i - 1];

        const distance = getDistanceBetweenTwoPoints(prev, cur);

        if (distance >= SIZE_BETWEEN_SEGMENTS) {
          newSegments.push({
            x: prev.x,
            y: prev.y,
          });
        } else {
          newSegments.push({
            x: cur.x,
            y: cur.y,
          });
        }
      }

      this.segments = [{ x: this.x, y: this.y }, ...newSegments];
    }
  }

  draw() {
    drawPlayerSnake(
      {
        segments: this.segments,
        headCoords: {
          x: this.x,
          y: this.y,
        },
        color: this.color,
      },

      this.ctx
    );
  }
}
