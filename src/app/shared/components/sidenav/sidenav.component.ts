import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserStore } from 'src/app/core/services/user.store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  user$ = this.userStore.user$.pipe(tap(console.log));

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStore: UserStore
  ) {}

  ngOnInit(): void {}

  logout() {
    console.log('Logout...');
    this.authService.logout();
  }
}
