import { createAction, props } from "@ngrx/store";
import { Card } from "src/app/models/card";


export const getCards = createAction("[CARDS] getCards", props<{ cards: Card[] }>());

export const addCard = createAction("[CARDS] addCard", props<{ card: Card }>());
export const addCardSuccess = createAction("[CARDS] addCardSuccess", props<{ card: Card }>());
export const addCardFail = createAction("[CARDS] addCardFail", props<{ msg: string }>());

