import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mapTo,
  switchMap,
  switchMapTo,
  take,
  tap,
} from 'rxjs/operators';
import { Credentials } from 'src/app/models/credentials';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore
  ) {
    this.http.get<void>(`${environment.apiUrl}/csrf-token`).subscribe();
  }

  register(credentials: Credentials): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.apiUrl}/register`,
      credentials
    );
  }

  logout(): void {
    this.http.get<void>(`${environment.apiUrl}/logout`).subscribe({
      next: () => {
        this.userStore.removeUser();
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error(error);
        this.userStore.removeUser();
        this.router.navigateByUrl('/login');
      },
    });
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        console.log("User: ", user, forceReload);
        return !!user && !forceReload
          ? of(user)
          : this.http
              .get<any>(`${environment.apiUrl}/me`, {})
              .pipe(tap((u) => this.userStore.setUser(u)));
      })
    );
  }


  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        switchMapTo(this.fetchUser(true)),
        mapTo(true),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
  }
}
