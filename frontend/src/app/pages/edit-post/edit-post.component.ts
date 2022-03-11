import { Component, OnInit, ViewChild } from '@angular/core';
import { PostData } from '../../models/post.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { createPostRequest } from '../../store/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.sass']
})
export class EditPostComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;

  constructor(
    private store: Store<AppState>
  ) {
    this.loading = store.select(state => state.posts.createLoading);
    this.error = store.select(state => state.posts.createError);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const postData: PostData = this.form.value;
    this.store.dispatch(createPostRequest({postData}));
  }
}
