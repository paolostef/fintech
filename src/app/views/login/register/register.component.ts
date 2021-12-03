import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(data: any) {
    console.log('register', data);
    const { email, name, surname, password } = data;
    this.authService.register({ email, name, surname, password }).subscribe({
      next: (ok) => {
        if (ok) {
          this.snackBar
            .open(
              'Registrato con successo! Accedi subito al fantastico mondo di Fintech',
              'Vai'
            )
            .afterDismissed()
            .subscribe({
              next: (info) => {
                if (info.dismissedByAction) {
                  this.authService.login(email, password).subscribe({
                    next: (ok) => {
                      ok
                        ? this.router.navigateByUrl('/dashboard')
                        : this.snackBar.open('Errore di accesso!', 'KO');
                    },
                  });
                }
              },
            });
        } else {
          console.error(ok);
          this.snackBar.open('Errore nella registrazione!', 'KO');
        }
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('Errore nella registrazione!', 'KO');
      },
    });
  }
}
