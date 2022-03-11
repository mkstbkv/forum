import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import {
  createCommentFailure,
  createCommentRequest, createCommentSuccess,
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from './comments.actions';
import { CommentsService } from '../services/comments.service';
import { Router } from '@angular/router';


@Injectable()

export class CommentsEffects {
  fetchComments = createEffect(() => this.actions.pipe(
    ofType(fetchCommentsRequest),
    mergeMap(({id}) => this.commentsService.getComments(id).pipe(
      map(comments => fetchCommentsSuccess({comments})),
      catchError(() => of(fetchCommentsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createComment = createEffect(() => this.actions.pipe(
    ofType(createCommentRequest),
    mergeMap(({commentData, token}) => this.commentsService.createComment(commentData, token).pipe(
      map(() => createCommentSuccess()),
      tap(() => this.router.navigate(['/posts/' + commentData.post])),

      catchError(() => of(createCommentFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private commentsService: CommentsService,
    private router: Router
  ) {}
}
