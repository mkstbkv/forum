import { LoginError, RegisterError, User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';

export type CommentsState = {
  comments: Comment[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};
export type PostsState = {
  posts: Post[],
  post: null | Post,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  comments: CommentsState,
  posts: PostsState,
  users: UsersState,
}
