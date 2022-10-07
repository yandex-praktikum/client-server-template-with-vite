import { getDistanceBetweenTwoPoints } from './helpers/getDistanceBetweenTwoPoints';
import { makeSnakeSegment } from './helpers/makeSnakeSegment';
import { TSnakeColor } from './Snake.types';

const SHOW_LOGS = false;

const SIZE_BETWEEN_SEGMENTS = 20;
const SPEED = 2;
const BOOST_SPEED = 4;

export class MySnake {
  // Флаг для откусывания жопки по таймауту
  isActiveTimeOut = false
  // позиция головы змейки по горизонтали
  x: number;
  // позиция головы змейки по вертикали
  y: number;
  // контекст канваса, на котором необходимо нарисовать змейку
  private ctx: CanvasRenderingContext2D;
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
  showLogs: boolean;

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    color?: TSnakeColor,
    initialSnakeLength = 20,
    size = 24,
  ) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.r = size;
    this.segments = [];
    this.color = color || 'red';
    this.showLogs = SHOW_LOGS;

    for (let i = 0; i < initialSnakeLength; i++) {
      this.segments.push({
        x,
        y,
      });
    }

    setInterval(() => this.decreaseLength(), 2000)

    this.canvasSegment = makeSnakeSegment(this.r, this.color)
  }

  increaseLength() {
    this.segments.push(this.segments[this.segments.length - 1]);
  }

  decreaseLength() {
    if (this.segments.length > 2 && this.isActiveTimeOut) {
      this.segments.pop()
      this.isActiveTimeOut = false
    }
  }

  move(x: number, y: number, boost = false) {
    const distanceToMouse = getDistanceBetweenTwoPoints({ x: this.x, y: this.y }, { x, y });

    // Если голова достигла курсора мыши, то змейка останавливается и пересчитывать ее кординаты не нужно
    if (distanceToMouse < this.r / 2) {
      this.isActiveTimeOut = true
      return
    }

    this.isActiveTimeOut = false

    const speed = boost ? BOOST_SPEED : SPEED


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

  drawSegment(x: number, y: number) {
    const startX = x - this.r;
    const startY = y - this.r;
    const width = this.r * 2;
    const height = this.r * 2;
    this.ctx.drawImage(this.canvasSegment, startX, startY, width, height);
  }

  drawCoordinateLogs(index: number, x: number, y: number) {
    if (!this.showLogs) {
      return;
    }

    this.ctx.font = '20px serif';
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(`[${index}] x: ${Math.ceil(x)} ; y: ${Math.ceil(y)}`, 10, 100 + index * 20);
  }

  drawEyesLogs(x: number, y: number) {
    if (!this.showLogs) {
      return;
    }

    this.ctx.font = '20px serif';
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(`eye_x: ${x}`, 300, 100);
    this.ctx.fillText(`eye_y: ${y}`, 300, 120);
  }

  drawEyes() {
    const deltaAngle = Math.atan2(this.y - this.segments[1].y, this.x - this.segments[1].x);

    const EYE_SIZE = 0.3; // размер глаза
    const PUPIL_SIZE = EYE_SIZE * 0.7; // размер зрачка
    const DISTANCE_BETWEEN_YEYS = this.r / 4;

    const eye_x = Math.cos(deltaAngle) * this.r * EYE_SIZE;
    const eye_y = Math.sin(deltaAngle) * this.r * EYE_SIZE;
    this.drawEyesLogs(eye_x, eye_y);

    this.ctx.save();
    this.ctx.translate(this.x + eye_x, this.y + eye_y);

    this.ctx.beginPath();
    this.ctx.arc(eye_x - DISTANCE_BETWEEN_YEYS, eye_y, this.r * EYE_SIZE, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(eye_x + DISTANCE_BETWEEN_YEYS, eye_y, this.r * EYE_SIZE, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(eye_x - DISTANCE_BETWEEN_YEYS, eye_y, this.r * PUPIL_SIZE, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = '#000000';
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(eye_x + DISTANCE_BETWEEN_YEYS, eye_y, this.r * PUPIL_SIZE, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  draw() {
    // Отрисовываем элементы хвоста, начиная с конца
    for (let i = this.segments.length - 1; i > 0; i--) {
      const segment = this.segments[i - 1];
      const { x, y } = segment;
      this.drawSegment(Math.ceil(x), Math.ceil(y));
      this.drawCoordinateLogs(i, x, y);
    }

    // Отрисовываем голову
    this.drawSegment(this.x, this.y);
    this.drawCoordinateLogs(0, this.x, this.y);

    this.drawEyes();
  }
}
