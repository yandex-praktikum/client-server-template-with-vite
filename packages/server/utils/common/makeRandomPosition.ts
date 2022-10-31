import { makeRandomIntFromInterval } from './makeRandomIntFromInterval';

// TODO: добавить тип возвращаемого значения функцией и добавить описание хэлпера
export const makeRandomPosition = (mapWidth: number, mapHeight: number, insideOffset = 0) => {
  const x = makeRandomIntFromInterval(insideOffset, mapWidth - insideOffset);
  const y = makeRandomIntFromInterval(insideOffset, mapHeight - insideOffset);

  return { x, y };
};
