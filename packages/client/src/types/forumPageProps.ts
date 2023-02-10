export type TThreadData = {
  thread_id: number,
  title: string
};

export interface IForumThreadApiModel {
  author: IForumUserApiModel,
  created_at: string,
  description: string,
  id: number,
  title: string,
}

export interface IForumCommentApiModel {
  author: IForumUserApiModel,
  content: string,
  createdAt: string,
  id: number,
  thread_id: number,
}

export interface IForumThreadRequest {
  user: IForumUserApiModel,
  title: string,
  description: string,
}

export interface IForumCommentRequest {
  user: IForumUserApiModel,
  thread_id: number,
  content: string,
}

export interface IForumUserApiModel {
  id: number,
  name: string,
  avatar_path: string,
}
