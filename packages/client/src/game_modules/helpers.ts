export const randomIntInRange = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const randomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
