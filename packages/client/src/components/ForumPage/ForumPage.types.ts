import { TUser } from '../../../../shared/types';

export type TComment = {
  id: number;
  // текст комментария
  content: string;
  // автор комментария
  author: Pick<TUser, 'first_name' | 'second_name' | 'avatar'>;
  // дата создания комментария
  createdAt: string;
  // ответы на комментарий
  answers?: TComment[];
};

export type TTheme = {
  id: number;
  // название темы
  title: string;
  // содержание
  content: string;
  // автор темы
  author: Pick<TUser, 'first_name' | 'second_name' | 'avatar'>;
  // дата создания темы
  createdAt: string;
  // обсуждения темы
  discussions?: TComment[];
};
