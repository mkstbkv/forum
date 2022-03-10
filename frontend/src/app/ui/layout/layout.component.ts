import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';

class AppState {
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user!: Observable<null | User>;

  constructor(private store: Store<AppState>) {

  }

  logout() {

  }
}
