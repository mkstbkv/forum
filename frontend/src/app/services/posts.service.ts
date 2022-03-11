import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Post, PostData } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>(environment.apiUrl + '/posts').pipe(
      map(response => {
        return response.map(postData => {
          return new Post(
            postData._id,
            postData.title,
            postData.description,
            postData.image,
            postData.dateTime,
            postData.user
          );
        });
      })
    );
  }

  getPost(id: string) {
    return this.http.get<Post>(environment.apiUrl + '/posts/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

  createPost(postData: PostData, token: string) {
    const formData = new FormData();

    Object.keys(postData).forEach(key => {
      if (postData[key] !== null) {
        formData.append(key, postData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/posts', formData, {
      headers: new HttpHeaders({'Authorization': token}),
    });
  }
}
