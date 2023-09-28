enum shapeColors {
  YELLOW = '#F6C448',
  BLUE = '#0A4DAE',
  RED = '#C83612',
  CRIMSON = '#D9045D',
  GRAY = '#EEEEF5',
  FLESH = '#FFF0C0',
  NAVYBLUE = '#0F588C',
}

class CanvasAPI {
  private context: CanvasRenderingContext2D
  private squareWidth = 30
  private width: number
  private height: number
  private x: number
  private y = 0
  private shapeWidth = 0
  private shapeHeight = 0
  private animId = 0
  private fieldMatrix: string[][] = []
  private shapeMatrix: number[][] = []
  private state = 0
  private shapeColor = ''

  constructor(element: HTMLCanvasElement) {
    this.context = element.getContext('2d') as CanvasRenderingContext2D
    this.width = element.width
    this.height = element.height
    this.x = this.width / 2

    for (let i = 0; i < this.height / this.squareWidth; i++) {
      const subArr: string[] = []
      for (let j = 0; j < this.width / this.squareWidth; j++) {
        subArr.push('')
      }
      this.fieldMatrix.push(subArr)
    }
  }

  startGame() {
    this.setListeners()
    this.drawObjects()
  }

  setListeners() {
    document.addEventListener('keyup', e => {
      this.moveObject(e)
      this.rotateObject(e)
    })
  }

  drawPiece(color: string, positionX: number, positionY: number) {
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

  animation(
    startTime: number,
    animationTime: number,
    func: typeof this.drawCheck
  ) {
    let stopAnim = false
    const time = performance.now()
    const shift = time - startTime
    const multiply = shift / animationTime
    const length = this.height - this.shapeHeight
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

    func(this.x, this.y, this.state)

    if (multiply < 1) {
      if (this.fieldMatrix.length != currentMatrixPosY + 1) {
        for (let i = 0; i < this.shapeWidth / this.squareWidth; i++) {
          for (let j = this.shapeHeight / this.squareWidth - 1; j >= 0; j--) {
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
        this.animId = requestAnimationFrame(() =>
          this.animation(startTime, animationTime, func)
        )
      }
    } else {
      stopAnim = true
    }

    if (stopAnim) {
      for (let i = 0; i < this.shapeHeight / this.squareWidth; i++) {
        for (let j = 0; j < this.shapeWidth / this.squareWidth; j++) {
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
      this.drawObjects()
    }
  }

  drawObjects() {
    const index = Math.floor(Math.random() * 6)
    const time = 6000

    switch (index) {
      case 0:
        this.drawCheck(this.x, 0, 0)
        this.animation(performance.now(), time, this.drawCheck.bind(this))
        break
      case 1:
        this.drawInvertCheck(this.x, 0, 0)
        this.animation(performance.now(), time, this.drawInvertCheck.bind(this))
        break
      case 2:
        this.drawG(this.x, 0, 0)
        this.animation(performance.now(), time, this.drawG.bind(this))
        break
      case 3:
        this.drawInvertG(this.x, 0, 0)
        this.animation(performance.now(), time, this.drawInvertG.bind(this))
        break
      case 4:
        this.drawSquare(this.x, 0, 0)
        this.animation(performance.now(), time, this.drawSquare.bind(this))
        break
      case 5:
        this.drawLine(this.x, 0, 0)
        this.animation(performance.now(), time, this.drawLine.bind(this))
        break
    }
  }

  drawLine(positionX: number, positionY: number, state: number) {
    this.shapeColor = shapeColors.YELLOW
    if (state == 0 || state == 2) {
      for (let i = 0; i < 4; i++) {
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth * i,
          positionY
        )
      }
      this.shapeMatrix = [[1, 1, 1, 1]]
      this.shapeWidth = this.squareWidth * 4
      this.shapeHeight = this.squareWidth * 1
    } else {
      for (let i = 0; i < 4; i++) {
        this.drawPiece(
          this.shapeColor,
          positionX,
          positionY + this.squareWidth * i
        )
      }
      this.shapeMatrix = [[1], [1], [1], [1]]
      this.shapeWidth = this.squareWidth * 1
      this.shapeHeight = this.squareWidth * 4
    }
  }

  drawSquare(positionX: number, positionY: number, state: number) {
    if (state) {
      this.shapeColor = shapeColors.CRIMSON
      this.shapeWidth = this.squareWidth * 2
      this.shapeHeight = this.squareWidth * 2
      this.drawPiece(this.shapeColor, positionX, positionY)
      this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
      this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth,
        positionY + this.squareWidth
      )
      this.shapeMatrix = [
        [1, 1],
        [1, 1],
      ]
    }
  }

  drawG(positionX: number, positionY: number, state: number) {
    this.shapeColor = shapeColors.BLUE
    switch (state) {
      case 0:
        this.shapeWidth = this.squareWidth * 2
        this.shapeHeight = this.squareWidth * 3
        this.drawPiece(this.shapeColor, positionX, positionY)
        this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
        this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
        this.drawPiece(
          this.shapeColor,
          positionX,
          positionY + this.squareWidth * 2
        )
        this.shapeMatrix = [
          [1, 1],
          [1, 1],
          [1, 1],
        ]
        this.shapeMatrix[1][1] = 0
        this.shapeMatrix[2][1] = 0
        break
      case 1:
        this.shapeWidth = this.squareWidth * 3
        this.shapeHeight = this.squareWidth * 2
        this.drawPiece(this.shapeColor, positionX, positionY)
        this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth * 2,
          positionY
        )
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth * 2,
          positionY + this.squareWidth
        )
        this.shapeMatrix = new Array(2).fill(new Array(3).fill(1))
        this.shapeMatrix = [
          [1, 1, 1],
          [1, 1, 1],
        ]
        this.shapeMatrix[1][0] = 0
        this.shapeMatrix[1][1] = 0
        break
      case 2:
        this.shapeWidth = this.squareWidth * 2
        this.shapeHeight = this.squareWidth * 3
        this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth,
          positionY + this.squareWidth
        )
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth,
          positionY + this.squareWidth * 2
        )
        this.drawPiece(
          this.shapeColor,
          positionX,
          positionY + this.squareWidth * 2
        )
        this.shapeMatrix = [
          [1, 1],
          [1, 1],
          [1, 1],
        ]
        this.shapeMatrix[0][0] = 0
        this.shapeMatrix[1][0] = 0
        break
      case 3:
        this.shapeWidth = this.squareWidth * 3
        this.shapeHeight = this.squareWidth * 2
        this.drawPiece(this.shapeColor, positionX, positionY)
        this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth,
          positionY + this.squareWidth
        )
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth * 2,
          positionY + this.squareWidth
        )
        this.shapeMatrix = [
          [1, 1, 1],
          [1, 1, 1],
        ]
        this.shapeMatrix[0][1] = 0
        this.shapeMatrix[0][2] = 0
        break
    }
  }

  drawInvertG(positionX: number, positionY: number, state: number) {
    this.shapeColor = shapeColors.RED
    switch (state) {
      case 0:
        this.shapeWidth = this.squareWidth * 2
        this.shapeHeight = this.squareWidth * 3
        this.drawPiece(this.shapeColor, positionX, positionY)
        this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth,
          positionY + this.squareWidth
        )
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth,
          positionY + this.squareWidth * 2
        )
        this.shapeMatrix = [
          [1, 1],
          [1, 1],
          [1, 1],
        ]
        this.shapeMatrix[1][0] = 0
        this.shapeMatrix[2][0] = 0
        break
      case 1:
        this.shapeWidth = this.squareWidth * 3
        this.shapeHeight = this.squareWidth * 2
        this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth,
          positionY + this.squareWidth
        )
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth * 2,
          positionY + this.squareWidth
        )
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth * 2,
          positionY
        )
        this.shapeMatrix = [
          [1, 1, 1],
          [1, 1, 1],
        ]
        this.shapeMatrix[0][0] = 0
        this.shapeMatrix[0][1] = 0
        break
      case 2:
        this.shapeWidth = this.squareWidth * 2
        this.shapeHeight = this.squareWidth * 3
        this.drawPiece(this.shapeColor, positionX, positionY)
        this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
        this.drawPiece(
          this.shapeColor,
          positionX,
          positionY + this.squareWidth * 2
        )
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth,
          positionY + this.squareWidth * 2
        )
        this.shapeMatrix = [
          [1, 1],
          [1, 1],
          [1, 1],
        ]
        this.shapeMatrix[0][1] = 0
        this.shapeMatrix[1][1] = 0
        break
      case 3:
        this.shapeWidth = this.squareWidth * 3
        this.shapeHeight = this.squareWidth * 2
        this.drawPiece(this.shapeColor, positionX, positionY)
        this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
        this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
        this.drawPiece(
          this.shapeColor,
          positionX + this.squareWidth * 2,
          positionY
        )
        this.shapeMatrix = [
          [1, 1, 1],
          [1, 1, 1],
        ]
        this.shapeMatrix[1][1] = 0
        this.shapeMatrix[1][2] = 0
        break
    }
  }

  drawCheck(positionX: number, positionY: number, state: number) {
    this.shapeColor = shapeColors.GRAY
    if (state == 0 || state == 2) {
      this.shapeWidth = this.squareWidth * 2
      this.shapeHeight = this.squareWidth * 3
      this.drawPiece(this.shapeColor, positionX, positionY)
      this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth,
        positionY + this.squareWidth
      )
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth,
        positionY + this.squareWidth * 2
      )
      this.shapeMatrix = [
        [1, 1],
        [1, 1],
        [1, 1],
      ]
      this.shapeMatrix[0][1] = 0
      this.shapeMatrix[2][0] = 0
    } else {
      this.shapeWidth = this.squareWidth * 3
      this.shapeHeight = this.squareWidth * 2
      this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth,
        positionY + this.squareWidth
      )
      this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth * 2,
        positionY
      )
      this.shapeMatrix = [
        [1, 1, 1],
        [1, 1, 1],
      ]
      this.shapeMatrix[0][0] = 0
      this.shapeMatrix[1][2] = 0
    }
  }

  drawInvertCheck(positionX: number, positionY: number, state: number) {
    this.shapeColor = shapeColors.FLESH
    if (state == 0 || state == 2) {
      this.shapeWidth = this.squareWidth * 2
      this.shapeHeight = this.squareWidth * 3
      this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth,
        positionY + this.squareWidth
      )
      this.drawPiece(this.shapeColor, positionX, positionY + this.squareWidth)
      this.drawPiece(
        this.shapeColor,
        positionX,
        positionY + this.squareWidth * 2
      )
      this.shapeMatrix = [
        [1, 1],
        [1, 1],
        [1, 1],
      ]
      this.shapeMatrix[0][0] = 0
      this.shapeMatrix[2][1] = 0
    } else {
      this.shapeWidth = this.squareWidth * 3
      this.shapeHeight = this.squareWidth * 2
      this.drawPiece(this.shapeColor, positionX, positionY)
      this.drawPiece(this.shapeColor, positionX + this.squareWidth, positionY)
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth,
        positionY + this.squareWidth
      )
      this.drawPiece(
        this.shapeColor,
        positionX + this.squareWidth * 2,
        positionY + this.squareWidth
      )
      this.shapeMatrix = [
        [1, 1, 1],
        [1, 1, 1],
      ]
      this.shapeMatrix[0][2] = 0
      this.shapeMatrix[1][0] = 0
    }
  }

  rotateObject(e: KeyboardEvent) {
    if (e.key == 'ArrowUp') {
      if (this.x + this.shapeHeight > this.width) {
        this.x = this.width - this.shapeHeight
      }

      const buff = this.shapeWidth
      this.shapeWidth = this.shapeHeight
      this.shapeHeight = buff

      this.state = this.state + 1
      if (this.state > 3) {
        this.state = 0
      }
    }
  }

  moveObject(e: KeyboardEvent) {
    if (e.key == 'ArrowRight' && this.x != this.width - this.shapeWidth) {
      let pass = true

      for (let i = 0; i < this.shapeHeight / this.squareWidth; i++) {
        if (
          this.fieldMatrix[Math.floor(this.y / this.squareWidth) + i + 1][
            (this.x + this.shapeWidth) / this.squareWidth
          ]
        ) {
          pass = false
        }
      }

      if (pass) {
        this.x = this.x + this.squareWidth
      }
    }
    if (e.key == 'ArrowLeft' && this.x != 0) {
      let pass = true

      for (let i = 0; i < this.shapeHeight / this.squareWidth; i++) {
        if (
          this.fieldMatrix[Math.floor(this.y / this.squareWidth) + i + 1][
            this.x / this.squareWidth - 1
          ]
        ) {
          pass = false
        }
      }

      if (pass) {
        this.x = this.x - this.squareWidth
      }
    }
  }
}

export default CanvasAPI
