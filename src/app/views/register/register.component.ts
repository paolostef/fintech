import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;

  constructor() {}

  ngOnInit(): void {}

  register(data: any) {
    // TODO MANCA VALDIAZIONE PASSWORD 1 = 2
    console.log('register', data);
  }
}
