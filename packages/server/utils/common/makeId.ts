/** Возвращает случайно сгенерированную строку из указанных символов с указанной длиной */
export function makeId(characters: string, length: number): string {
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
