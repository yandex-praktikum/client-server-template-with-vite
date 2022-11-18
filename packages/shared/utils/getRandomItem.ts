/** Принимает массив и возвращает из него случайный элемент */
export function getRandomItem<T>(items: T[]): T {
  const randomIndex = Math.floor(Math.random() * items.length);

  return items[randomIndex];
}
