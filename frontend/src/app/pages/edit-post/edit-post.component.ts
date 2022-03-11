import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostData } from '../../models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { createPostRequest } from '../../store/posts.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  user: Observable<null | User>;
  userSub!: Subscription;
  token!: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.loading = store.select(state => state.posts.createLoading);
    this.error = store.select(state => state.posts.createError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.token = user.token;
      } else {
        this.token = '';
      }
    });
  }

  onSubmit() {
    const postData: PostData = this.form.value;
    const token = this.token
    this.store.dispatch(createPostRequest({postData, token}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
