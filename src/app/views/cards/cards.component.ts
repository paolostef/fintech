import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { CardForm } from 'src/app/models/card-form';
import { CardFormComponent } from './card-form/card-form.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent {
  @ViewChild(MatDrawer, { static: true }) matDrawer?: MatDrawer;
  @ViewChild('insertCard') cardForm?: CardFormComponent;

  cards$ = new BehaviorSubject<Card[]>([]);

  constructor(
    private snackBar: MatSnackBar,
    private cardsService: CardsService,
    private router: Router
  ) {
    this.cardsService.getCards().subscribe(this.cards$);
  }

  addCard(data: CardForm) {
    this.cardsService.addCard(data).subscribe({
      next: (card) => {
        this.cards$.next([...this.cards$.getValue(), card]);
        this.closeAddMovement();
        this.snackBar.open('Card aggiunta!', 'Ok');
      },
      error: console.error,
    });
  }

  removeMovement(id: string) {
    this.cardsService.deleteCard(id).subscribe({
      next: (ok) => {
        if (ok) {
          this.cards$.next(this.cards$.getValue().filter((x) => x._id != id));
          this.snackBar.open('Card rimossa!', 'Ok');
        } else {
          this.snackBar.open('Card non trovata', 'KO');
        }
      },
      error: console.error,
    });
  }

  viewMovement(id: string) {
    if (id) {
      this.router.navigateByUrl(`/dashboard/movements/${id}`);
    }
  }

  addMovement() {
    if (this.matDrawer) {
      this.matDrawer.open();
    }
  }

  closeAddMovement() {
    if (this.matDrawer) {
      this.cardForm?.cleanup();
      // NB Il drawer si chiude dopo o perdo la referenza
      this.matDrawer.close();
    }
  }
}
