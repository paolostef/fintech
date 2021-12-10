import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/models/card';
import { addCardSuccess, getCardsSuccess, removeCardSuccess } from './cards.actions';

export interface CardsState {
  cards: Card[];
}

export const initialState: CardsState = {
  cards: [],
};

export const cardsReducer = createReducer(
  initialState,
  on(getCardsSuccess, (state, action) => ({ ...state, cards: action.cards })),
  on(addCardSuccess, (state, action) => ({
    ...state,
    cards: [...state.cards, action.card],
  })),
  on(removeCardSuccess, (state, action) => ({
    ...state,
    cards: state.cards.filter(card => card._id !== action.id),
  }))
);
