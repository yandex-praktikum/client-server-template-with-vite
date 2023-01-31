export const getRandomIntInRange = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
