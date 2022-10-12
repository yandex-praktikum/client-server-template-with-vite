/** createAt должно быть в формате  YYYY-MM-DD или YYYY-MM-DDTHH:mm:ss
 * example: 2022-09-15T14:19:10
 * */

export const getCreatedAtValue = (createdAt: string) => createdAt.slice(0, 10).split('-').reverse().join('.');
