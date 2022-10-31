// TODO: вынести константу в настройки
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// TODO: добавить описание функции и тип возвращаемого значения
export function makeid(length: number) {
  let result = '';
  const charactersLength = CHARACTERS.length;

  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
