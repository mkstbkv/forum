import { createAction, props } from '@ngrx/store';
import { Post, PostData } from '../models/post.model';

export const fetchPostsRequest = createAction('[Posts] Fetch Request');

export const fetchPostsSuccess = createAction(
  '[Posts] Fetch Success',
  props<{posts: Post[]}>()
);
export const fetchPostsFailure = createAction(
  '[Posts] Fetch Failure',
  props<{error: string}>()
);

export const fetchPostRequest = createAction(
  '[Posts] One Post Fetch Request',
  props<{id: string}>()
);

export const fetchPostSuccess = createAction(
  '[Posts] One Post Fetch Success',
  props<{post: Post}>()
);
export const fetchPostFailure = createAction(
  '[Posts] One Post Fetch Failure',
  props<{error: string}>()
);

export const createPostRequest = createAction(
  '[Posts] Create Request',
  props<{postData: PostData, token: string}>()
);
export const createPostSuccess = createAction(
  '[Posts] Create Success'
);
export const createPostFailure = createAction(
  '[Posts] Create Failure',
  props<{error: string}>()
);
