import { createReducer, on } from '@ngrx/store';
import { PostsState } from './types';
import {
  createPostFailure,
  createPostRequest,
  createPostSuccess, fetchPostFailure, fetchPostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess, fetchPostSuccess
} from './posts.actions';


const initialState: PostsState = {
  posts: [],
  post: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const postsReducer = createReducer(
  initialState,
  on(fetchPostsRequest, state => ({...state, fetchLoading: true})),
  on(fetchPostsSuccess, (state, {posts}) => ({
    ...state,
    fetchLoading: false,
    posts
  })),
  on(fetchPostsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(fetchPostRequest, state => ({...state, fetchLoading: true})),
  on(fetchPostSuccess, (state, {post}) => ({
    ...state,
    fetchLoading: false,
    post
  })),
  on(fetchPostFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createPostRequest, state => ({...state, createLoading: true})),
  on(createPostSuccess, state => ({...state, createLoading: false})),
  on(createPostFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  }))
);
