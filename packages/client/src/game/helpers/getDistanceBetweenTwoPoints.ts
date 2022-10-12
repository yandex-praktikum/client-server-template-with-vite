type Point = {
  x: number;
  y: number;
};

export const getDistanceBetweenTwoPoints = (first: Point, second: Point) => {
  return Math.sqrt((second.x - first.x) ** 2 + (second.y - first.y) ** 2);
};
