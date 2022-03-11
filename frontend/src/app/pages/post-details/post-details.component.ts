import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Post } from '../../models/post.model';
import { fetchPostRequest } from '../../store/posts.actions';
import { Comment, CommentData } from '../../models/comment.model';
import { ActivatedRoute } from '@angular/router';
import { createCommentRequest, fetchCommentsRequest } from '../../store/comments.actions';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.sass']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  user: Observable<null | User>;
  userSub!: Subscription;
  post: Observable<null | Post>;
  postSub!: Subscription;
  token!: string;
  postOne!: Post | null;
  comments: Observable<Comment[]>

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.comments = store.select(state => state.comments.comments);
    this.loading = store.select(state => state.comments.fetchLoading);
    this.error = store.select(state => state.comments.fetchError);
    this.user = store.select(state => state.users.user);
    this.post = store.select(state => state.posts.post);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPostRequest({id: this.route.snapshot.params['id']}));
    this.store.dispatch(fetchCommentsRequest({id: this.route.snapshot.params['id']}));

    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.token = user.token;
      } else {
        this.token = '';
      }
    });

    this.postSub = this.post.subscribe(post => {
      if (post) {
        this.postOne = post;
      } else {
        this.postOne = null;
      }
    });
  }

  onSubmit() {
    const commentData: CommentData = {
      text: this.form.form.value.text,
      post: this.route.snapshot.params['id'],
    };
    const token = this.token;
    this.store.dispatch(createCommentRequest({commentData, token}));
    this.store.dispatch(fetchCommentsRequest({id: this.route.snapshot.params['id']}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.postSub.unsubscribe();
  }
}
