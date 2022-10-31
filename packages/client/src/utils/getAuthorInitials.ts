// TODO: добавить описание функции

export const getAuthorInitials = (author: { first_name: string; second_name: string }) =>
  author.first_name.slice(0, 1) + author.second_name.slice(0, 1);
