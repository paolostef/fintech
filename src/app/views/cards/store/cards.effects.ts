import { Injectable } from '@angular/core';
import {
  Actions, createEffect, ofType
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';
import { CardForm } from 'src/app/models/card-form';
import { addCard, addCardFail, addCardSuccess, getCards, getCardsFail, getCardsSuccess, removeCard, removeCardFail, removeCardSuccess } from './cards.actions';

@Injectable()
export class CardsEffects {
  constructor(
    private actions: Actions,
    private cardsService: CardsService,
    private store: Store
  ) {}


  loadCards$ = createEffect(() => this.actions.pipe(
    ofType(getCards),
    switchMap(() => this.cardsService.getCards().pipe(
      map(cards => getCardsSuccess({ cards })),
      catchError(() => of(getCardsFail))
    ))
  ))


  addCard$ = createEffect(() => this.actions.pipe(
    ofType(addCard),
    switchMap(({cardForm}) => this.cardsService.addCard(cardForm).pipe(
      map(card => addCardSuccess ({ card })),
      catchError(() => of(addCardFail))
    ))
  ))


  removeCard$ = createEffect(() => this.actions.pipe(
    ofType(removeCard),
    switchMap(({id}) => this.cardsService.deleteCard(id).pipe(
      map(card => removeCardSuccess ({ id })),
      catchError(() => of(removeCardFail))
    ))
  ))
}
