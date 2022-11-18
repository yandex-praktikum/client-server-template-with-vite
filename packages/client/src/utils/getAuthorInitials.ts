/** Возвращает инициалы по имени и фамилии */
export const getAuthorInitials = (author: { first_name: string; second_name: string }): string =>
  author.first_name.slice(0, 1) + author.second_name.slice(0, 1);
