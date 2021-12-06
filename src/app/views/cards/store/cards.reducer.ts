import { createReducer, on } from "@ngrx/store";
import { Card } from "src/app/models/card";
import { addCardSuccess } from "./cards.actions";

export interface CardsState {
    cards: Card[]
}

export const initialState: CardsState = {
    cards: []
}

export const cardsReducer = createReducer(
    initialState,
    on(addCardSuccess, (state, action) => ({ ...state, cards: [...state.cards, action.card] }))

);