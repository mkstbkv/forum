import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Comment, CommentData } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get<Comment[]>(environment.apiUrl + '/comments').pipe(
      map(response => {
        return response.map(commentData => {
          return new Comment(
            commentData._id,
            commentData.text,
            commentData.post,
            commentData.user,
          );
        });
      })
    );
  }

  createComment(commentData: CommentData) {
    const formData = new FormData();

    Object.keys(commentData).forEach(key => {
      if (commentData[key] !== null) {
        formData.append(key, commentData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/comments', formData);
  }
}
