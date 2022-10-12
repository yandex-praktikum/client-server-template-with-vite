export const getAuthorInitials = (author: { firstName: string; lastName: string }) =>
  author.firstName.slice(0, 1) + author.lastName.slice(0, 1);
