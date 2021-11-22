import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  name = 'Paolo Stefani'; //TODO PRENDILO DALLA SESSIONE

  constructor() {}

  ngOnInit(): void {}

  logout() {
    //TODO CHIAMA LOGOUT
    console.log('Logout...');
  }
}
