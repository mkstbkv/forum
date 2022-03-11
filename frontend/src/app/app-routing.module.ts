import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';

const routes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'posts/new', component: EditPostComponent},
  {path: 'posts/:id', component: PostDetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
