import { createAction, props } from "@ngrx/store";
import { Card } from "src/app/models/card";
import { CardForm } from "src/app/models/card-form";


export const getCards = createAction("[CARDS] getCards");
export const getCardsSuccess = createAction("[CARDS] getCardsSuccess", props<{ cards: Card[] }>());
export const getCardsFail = createAction("[CARDS] getCardsFail");

export const addCard = createAction("[CARDS] addCard", props<{ cardForm: CardForm }>());
export const addCardSuccess = createAction("[CARDS] addCardSuccess", props<{ card: Card }>());
export const addCardFail = createAction("[CARDS] addCardFail", props<{ msg: string }>());


export const removeCard = createAction("[CARDS] removeCard", props<{ id: string }>());
export const removeCardSuccess = createAction("[CARDS] removeCardSuccess", props<{ id: string }>());
export const removeCardFail = createAction("[CARDS] removeCardFail", props<{ msg: string }>());
