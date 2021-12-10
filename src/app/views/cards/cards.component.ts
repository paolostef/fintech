import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { CardForm } from 'src/app/models/card-form';
import { CardFormComponent } from './card-form/card-form.component';
import * as ActionCards from './store/cards.actions';
import { CardsEffects } from './store/cards.effects';
import * as ActionSelectors from './store/cards.selectors';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit, OnDestroy {
  @ViewChild(MatDrawer, { static: true }) matDrawer?: MatDrawer;
  @ViewChild('insertCard') cardForm?: CardFormComponent;

  cards$ = this.store.select(ActionSelectors.selectCards);

  todoDestroy: Subscription[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private cardsService: CardsService,
    private router: Router,
    private store: Store,
    private cardsEffects: CardsEffects
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ActionCards.getCards());

    const addCardSub = this.cardsEffects.addCard$.subscribe({
      next: (state) => {
        console.log(state);
        this.closeAddMovement();
        this.snackBar.open('Card aggiunta!', 'Ok');
      },
      error: (msg) => {
        console.error(msg);
        this.snackBar.open('Errore!', 'KO');
      },
    });
    this.todoDestroy.push(addCardSub);

    const removeCardSub = this.cardsEffects.removeCard$.subscribe({
      next: (state) => {
        console.log(state);
        this.snackBar.open('Card rimossa!', 'Ok');
      },
      error: (msg) => {
        console.error(msg);
        this.snackBar.open('Card non trovata', 'KO');
      },
    });
    this.todoDestroy.push(removeCardSub);
  }

  addCard(data: CardForm) {
    this.store.dispatch(ActionCards.addCard({ cardForm: data }));
  }

  removeMovement(id: string) {
    this.store.dispatch(ActionCards.removeCard({ id }));
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

  ngOnDestroy(): void {
    this.todoDestroy.forEach((sub) => sub.unsubscribe());
  }
}
