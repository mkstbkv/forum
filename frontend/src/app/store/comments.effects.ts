import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  createCommentFailure,
  createCommentRequest,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';
import { CommentsService } from '../services/comments';
import { createPostSuccess } from './posts.actions';


@Injectable()

export class CommentsEffects {
  fetchComments = createEffect(() => this.actions.pipe(
    ofType(fetchCommentsRequest),
    mergeMap(() => this.commentsService.getComments().pipe(
      map(comments => fetchCommentsSuccess({comments})),
      catchError(() => of(fetchCommentsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createComment = createEffect(() => this.actions.pipe(
    ofType(createCommentRequest),
    mergeMap(({commentData}) => this.commentsService.createComment(commentData).pipe(
      map(() => createPostSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createCommentFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private commentsService: CommentsService,
    private router: Router
  ) {}
}
