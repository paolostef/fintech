import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  cards: Card[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private cardsService: CardsService,
    private router: Router
  ) {
    this.cardsService.getCards().subscribe({
      next: (cards) => (this.cards = cards),
      error: console.error,
    });
  }

  addCard(data: CardForm) {
    this.cardsService.addCard(data).subscribe({
      next: (card) => {
        this.cards = [...this.cards, card];
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
          this.cards = this.cards.filter((x) => x._id != id);
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
