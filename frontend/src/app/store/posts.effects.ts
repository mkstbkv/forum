import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  createPostFailure,
  createPostRequest,
  createPostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess
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

  createProduct = createEffect(() => this.actions.pipe(
    ofType(createPostRequest),
    mergeMap(({postsData}) => this.postsService.createPost(postsData).pipe(
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
