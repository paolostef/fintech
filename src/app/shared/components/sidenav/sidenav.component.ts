import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  name = 'Paolo Stefani'; //TODO PRENDILO DALLA SESSIONE

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    //TODO CHIAMA LOGOUT
    console.log('Logout...');
    this.router.navigateByUrl("/login");
  }
}
