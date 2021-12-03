import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private loggedUser$ = new BehaviorSubject<User | null>(null);
  user$ = this.loggedUser$.asObservable();

  setUser(user: User) {
    this.loggedUser$.next(user);
  }

  removeUser() {
    this.loggedUser$.next(null);
  }
}
