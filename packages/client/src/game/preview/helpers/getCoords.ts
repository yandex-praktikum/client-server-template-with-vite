export const getCoords = (
  snakeX: number,
  snakeY: number,
  MAP_PADDING: number,
  SNAKE_SIZE: number,
  MAP_WIDTH: number,
  MAP_HEIGHT: number,
) => {
  const isRightDown =
    snakeX === MAP_WIDTH - (MAP_PADDING + SNAKE_SIZE) && snakeY === MAP_HEIGHT - (MAP_PADDING + SNAKE_SIZE);

  const isRightUp = snakeX === MAP_WIDTH - (MAP_PADDING + SNAKE_SIZE) && snakeY === MAP_PADDING + SNAKE_SIZE;

  const isLeftUp = snakeX === MAP_PADDING + SNAKE_SIZE && snakeY === MAP_PADDING + SNAKE_SIZE;

  const isLeftDown = snakeX === MAP_PADDING + SNAKE_SIZE && snakeY === MAP_HEIGHT - (MAP_PADDING + SNAKE_SIZE);

  const toRightUp = {
    x: MAP_WIDTH - (MAP_PADDING + SNAKE_SIZE),
    y: MAP_PADDING,
  };

  const toLeftUp = {
    x: MAP_PADDING,
    y: MAP_PADDING + SNAKE_SIZE,
  };

  const toLeftDowm = {
    x: MAP_PADDING + SNAKE_SIZE,
    y: MAP_HEIGHT - MAP_PADDING,
  };

  const toRightDown = {
    x: MAP_WIDTH - MAP_PADDING,
    y: MAP_HEIGHT - (MAP_PADDING + SNAKE_SIZE),
  };

  return {
    isRightDown,
    isLeftDown,
    isLeftUp,
    isRightUp,
    toRightDown,
    toLeftDowm,
    toRightUp,
    toLeftUp,
  };
};
