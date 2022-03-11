import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  createPostFailure,
  createPostRequest,
  createPostSuccess, fetchPostFailure, fetchPostRequest,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess, fetchPostSuccess
} from './posts.actions';
import { PostsService } from '../services/posts.service';

@Injectable()
export class PostsEffects {
  fetchPosts = createEffect(() => this.actions.pipe(
    ofType(fetchPostsRequest),
    mergeMap(() => this.postsService.getPosts().pipe(
      map(posts => fetchPostsSuccess({posts})),
      catchError(() => of(fetchPostsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchPost = createEffect(() => this.actions.pipe(
    ofType(fetchPostRequest),
    mergeMap( ({id}) => this.postsService.getPost(id).pipe(
      map(post => fetchPostSuccess({post})),
      catchError(() => of(fetchPostFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createPost = createEffect(() => this.actions.pipe(
    ofType(createPostRequest),
    mergeMap(({postData, token}) => this.postsService.createPost(postData, token).pipe(
      map(() => createPostSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPostFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private postsService: PostsService,
    private router: Router
  ) {}
}
