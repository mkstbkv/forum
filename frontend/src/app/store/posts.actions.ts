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

export const createPostRequest = createAction(
  '[Posts] Create Request',
  props<{postsData: PostData}>()
);
export const createPostSuccess = createAction(
  '[Posts] Create Success'
);
export const createPostFailure = createAction(
  '[Posts] Create Failure',
  props<{error: string}>()
);
