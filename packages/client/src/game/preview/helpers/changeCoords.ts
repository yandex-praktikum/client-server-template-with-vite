import { getCoords } from './getCoords';

export const changeCoords = (
  snakeX: number,
  snakeY: number,
  MAP_WIDTH: number,
  MAP_HEIGHT: number,
  opt: {
    margin: number;
    size: number;
    x: number;
    y: number;
  },
) => {
  const data = getCoords(snakeX, snakeY, opt.margin, opt.size, MAP_WIDTH, MAP_HEIGHT);
  const { isRightDown, isRightUp, toRightUp, toLeftUp, isLeftUp, toLeftDowm, isLeftDown, toRightDown } = data;

  if (isRightDown) {
    opt.x = toRightUp.x;
    opt.y = toRightUp.y;
  } else if (isRightUp) {
    opt.x = toLeftUp.x;
    opt.y = toLeftUp.y;
  } else if (isLeftUp) {
    opt.x = toLeftDowm.x;
    opt.y = toLeftDowm.y;
  } else if (isLeftDown) {
    opt.x = toRightDown.x;
    opt.y = toRightDown.y;
  }
};
