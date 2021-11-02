import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  hide = true;

  constructor(public matcher: ErrorStateMatcher) {}

  ngOnInit(): void {}

  singin(data: any) {
    console.log('signin', data);
  }
}
