/** Возвращает рандомное число из промежутка */
export const makeRandomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
