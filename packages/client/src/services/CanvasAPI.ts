enum shapeColors {
  YELLOW = '#F6C448',
  BLUE = '#0A4DAE',
  RED = '#C83612',
  CRIMSON = '#D9045D',
  GRAY = '#EEEEF5',
  FLESH = '#FFF0C0',
  NAVYBLUE = '#0F588C',
}

const startShapeMatrix = {
  YELLOW: [[1, 1, 1, 1]],
  BLUE: [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  RED: [
    [1, 1],
    [0, 1],
    [0, 1],
  ],
  CRIMSON: [
    [1, 1],
    [1, 1],
  ],
  GRAY: [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  FLESH: [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  NAVYBLUE: [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
}

const LINE_SCORE = 100
const SPEED_STEP = 1000
const MAX_SPEED = 5
const START_ANIMATE_TIME = 6000
const MAX_SPEED_ANIMATE_TIME = 2000

export type CanvasAPIType = {
  element: HTMLCanvasElement
  setScore: ({ score, speed }: { score: number; speed: number }) => void
  setGameEnd: (b: boolean) => void
  setNextShape: (a: string) => void
}

class CanvasAPI {
  private context: CanvasRenderingContext2D
  private squareWidth = 30
  private animTime = START_ANIMATE_TIME
  private width = 0
  private height = 0
  private x = 0
  private y = 0
  private animId = 0
  private fieldMatrix: string[][] = []
  private shapeMatrix: number[][] = []
  private nextShapeMatrix: number[][] = []
  private shapeColor = ''
  private nextShapeColor = ''
  private nextShapeName = ''
  private gameState = false
  private score = 0
  private setScore
  private setGameEnd
  private setNextShape
  private speed = 0

  constructor({ element, setScore, setGameEnd, setNextShape }: CanvasAPIType) {
    this.context = element?.getContext('2d') as CanvasRenderingContext2D
    this.width = element?.width
    this.height = element?.height
    this.x = this.width / 2
    this.setScore = setScore
    this.setGameEnd = setGameEnd
    this.setNextShape = setNextShape

    for (let i = 0; i < this.height / this.squareWidth; i++) {
      const subArr: string[] = []
      for (let j = 0; j < this.width / this.squareWidth; j++) {
        subArr.push('')
      }
      this.fieldMatrix.push(subArr)
    }
  }
  startGame() {
    if (!this.gameState) {
      this.gameState = true
      this.drawObjects()
      this.setListeners()
    }
  }

  private setListeners() {
    document.addEventListener('keydown', e => {
      e.preventDefault()
      this.moveObject(e)
      this.rotateObject(e)
    })
  }

  private drawPiece(color: string, positionX: number, positionY: number) {
    this.context.fillStyle = color
    this.context.lineWidth = 2

    this.context.strokeRect(
      positionX,
      positionY,
      this.squareWidth,
      this.squareWidth
    )
    this.context.fillRect(
      positionX + 1,
      positionY + 1,
      this.squareWidth - 2,
      this.squareWidth - 2
    )
  }

  private animation(startTime: number) {
    let stopAnim = false
    const time = performance.now()
    const shift = time - startTime
    const multiply = shift / this.animTime
    const length = this.height - this.shapeMatrix.length * this.squareWidth
    this.y = length * multiply
    const currentMatrixPosY = Math.floor(this.y / this.squareWidth)
    const currentMatrixPosX = this.x / this.squareWidth
    this.context.clearRect(0, 0, this.width, this.height)

    for (let i = 0; i < this.height / this.squareWidth; i++) {
      for (let j = 0; j < this.width / this.squareWidth; j++) {
        if (this.fieldMatrix[i][j]) {
          this.drawPiece(
            this.fieldMatrix[i][j],
            j * this.squareWidth,
            i * this.squareWidth
          )
        }
      }
    }

    this.drawShape(this.x, this.y)

    if (multiply < 1) {
      if (this.fieldMatrix.length != currentMatrixPosY + 1) {
        for (let i = 0; i < this.shapeMatrix[0].length; i++) {
          for (let j = this.shapeMatrix.length - 1; j >= 0; j--) {
            if (
              this.shapeMatrix[j][i] &&
              this.fieldMatrix[currentMatrixPosY + j + 1][currentMatrixPosX + i]
            ) {
              stopAnim = true
              cancelAnimationFrame(this.animId)
            }
          }
        }
      }

      if (!stopAnim) {
        this.animId = requestAnimationFrame(() => this.animation(startTime))
      }
    } else {
      stopAnim = true
    }

    if (stopAnim) {
      for (let i = 0; i < this.shapeMatrix.length; i++) {
        for (let j = 0; j < this.shapeMatrix[0].length; j++) {
          if (this.shapeMatrix[i][j]) {
            const posY =
              (Math.floor(this.y / 10) * 10 + this.squareWidth * i) /
              this.squareWidth
            const posX = (this.x + j * this.squareWidth) / this.squareWidth

            this.fieldMatrix[posY][posX] = this.shapeColor
          }
        }
      }

      this.x = this.width / 2
      this.burning()
      if (!this.gameOver()) {
        this.drawObjects()
      } else {
        this.setGameEnd(true)
      }
    }
  }

  private burning() {
    for (let i = 0; i < this.fieldMatrix.length; i++) {
      const fieldNullSquare = this.fieldMatrix[i].filter(item => item === '')
      if (fieldNullSquare.length === 0) {
        this.reshuffle(i)
        this.score += LINE_SCORE
        if (this.score % SPEED_STEP === 0) {
          this.speed = this.speed === MAX_SPEED ? 0 : this.speed + 1
          this.animTime =
            START_ANIMATE_TIME -
            ((START_ANIMATE_TIME - MAX_SPEED_ANIMATE_TIME) / MAX_SPEED) *
              this.speed
        }
        this.setScore({ score: this.score, speed: this.speed })
      }
    }
  }

  private reshuffle(lineNumber: number) {
    for (let i = lineNumber; i > 0; i--) {
      for (let j = 0; j < this.fieldMatrix[i].length; j++) {
        this.fieldMatrix[i][j] = this.fieldMatrix[i - 1][j]
      }
    }
    for (let j = 0; j < this.fieldMatrix[0].length; j++) {
      this.fieldMatrix[0][j] = ''
    }
  }

  gameOver() {
    let isGameOver = false
    cancelAnimationFrame(this.animId)
    for (let i = 0; i < this.fieldMatrix[0].length; i++) {
      if (this.fieldMatrix[0][i] !== '') {
        isGameOver = true
      }
    }

    return isGameOver
  }

  private drawNextObject() {
    const index = Math.floor(Math.random() * 7)

    switch (index) {
      case 0:
        this.nextShapeColor = shapeColors.YELLOW
        this.nextShapeMatrix = startShapeMatrix.YELLOW
        this.nextShapeName = 'yellow'
        break
      case 1:
        this.nextShapeColor = shapeColors.BLUE
        this.nextShapeMatrix = startShapeMatrix.BLUE
        this.nextShapeName = 'blue'
        break
      case 2:
        this.nextShapeColor = shapeColors.RED
        this.nextShapeMatrix = startShapeMatrix.RED
        this.nextShapeName = 'red'
        break
      case 3:
        this.nextShapeColor = shapeColors.CRIMSON
        this.nextShapeMatrix = startShapeMatrix.CRIMSON
        this.nextShapeName = 'crimson'
        break
      case 4:
        this.nextShapeColor = shapeColors.GRAY
        this.nextShapeMatrix = startShapeMatrix.GRAY
        this.nextShapeName = 'gray'
        break
      case 5:
        this.nextShapeColor = shapeColors.FLESH
        this.nextShapeMatrix = startShapeMatrix.FLESH
        this.nextShapeName = 'flesh'
        break
      case 6:
        this.nextShapeColor = shapeColors.NAVYBLUE
        this.nextShapeMatrix = startShapeMatrix.NAVYBLUE
        this.nextShapeName = 'navyblue'
        break
    }

    if (this.nextShapeName) {
      this.setNextShape(this.nextShapeName)
    }
  }

  private drawObjects() {
    if (this.nextShapeMatrix && this.nextShapeColor) {
      this.shapeMatrix = this.nextShapeMatrix
      this.shapeColor = this.nextShapeColor
      this.drawNextObject()
      this.animation(performance.now())

      return
    }

    this.drawNextObject()
    const index = Math.floor(Math.random() * 7)

    switch (index) {
      case 0:
        this.shapeColor = shapeColors.YELLOW
        this.shapeMatrix = startShapeMatrix.YELLOW
        break
      case 1:
        this.shapeColor = shapeColors.BLUE
        this.shapeMatrix = startShapeMatrix.BLUE
        break
      case 2:
        this.shapeColor = shapeColors.RED
        this.shapeMatrix = startShapeMatrix.RED
        break
      case 3:
        this.shapeColor = shapeColors.CRIMSON
        this.shapeMatrix = startShapeMatrix.CRIMSON
        break
      case 4:
        this.shapeColor = shapeColors.GRAY
        this.shapeMatrix = startShapeMatrix.GRAY
        break
      case 5:
        this.shapeColor = shapeColors.FLESH
        this.shapeMatrix = startShapeMatrix.FLESH
        break
      case 6:
        this.shapeColor = shapeColors.NAVYBLUE
        this.shapeMatrix = startShapeMatrix.NAVYBLUE
        break
    }

    this.animation(performance.now())
  }

  private drawShape(positionX: number, positionY: number) {
    for (let i = 0; i < this.shapeMatrix.length; i++) {
      for (let j = 0; j < this.shapeMatrix[i].length; j++) {
        if (this.shapeMatrix[i][j]) {
          this.drawPiece(
            this.shapeColor,
            positionX + j * this.squareWidth,
            positionY + i * this.squareWidth
          )
        }
      }
    }
  }

  private rotateMatrix() {
    const newArr: number[][] = []

    for (let i = 0; i < this.shapeMatrix[0].length; i++) {
      const subArr: number[] = []
      for (let j = this.shapeMatrix.length - 1; j >= 0; j--) {
        subArr.push(this.shapeMatrix[j][i])
      }
      newArr.push(subArr)
    }

    this.shapeMatrix = newArr
  }

  private rotateObject(e: KeyboardEvent) {
    if (e.key == 'ArrowUp') {
      if (
        this.y + this.shapeMatrix[0].length * this.squareWidth <
        this.height
      ) {
        if (this.x + this.shapeMatrix.length * this.squareWidth > this.width) {
          this.x = this.width - this.shapeMatrix.length * this.squareWidth
        }

        this.rotateMatrix()
      }
    }
  }

  private moveObject(e: KeyboardEvent) {
    if (
      e.key == 'ArrowRight' &&
      this.x != this.width - this.shapeMatrix[0].length * this.squareWidth
    ) {
      let pass = true

      for (let i = 0; i < this.shapeMatrix.length; i++) {
        if (
          this.fieldMatrix[Math.floor(this.y / this.squareWidth) + i + 1][
            (this.x + this.shapeMatrix[0].length * this.squareWidth) /
              this.squareWidth
          ]
        ) {
          pass = false
        }
      }

      if (pass) this.x = this.x + this.squareWidth
    }

    if (e.key == 'ArrowLeft' && this.x != 0) {
      let pass = true

      for (let i = 0; i < this.shapeMatrix.length; i++) {
        if (
          this.fieldMatrix[Math.floor(this.y / this.squareWidth) + i + 1][
            this.x / this.squareWidth - 1
          ]
        ) {
          pass = false
        }
      }

      if (pass) this.x = this.x - this.squareWidth
    }
  }
}

export default CanvasAPI
