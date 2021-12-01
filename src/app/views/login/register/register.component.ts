import { Component, OnInit } from '@angular/core';
import { PasswordStateMatcher } from '../utility/password-error-state-mather.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;

  passwordEqualsMatcher = new PasswordStateMatcher();

  constructor() {}

  ngOnInit(): void {}

  register(data: any) {
    console.log('register', data);
  }
}
