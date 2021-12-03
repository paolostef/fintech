import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  hide = true;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  singin(data: any) {
    console.log('signin', data);
    const { email, password } = data;
    this.authService.login(email, password).subscribe({
      next: (ok) => {
        if (ok) {
          this.router.navigateByUrl('/dashboard');
        } else {
          this.snackBar.open('Errore di accesso!', 'KO');
        }
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('Credenziali errate', 'KO');
      },
    });
  }
}
