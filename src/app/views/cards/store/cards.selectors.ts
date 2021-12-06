import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { Card } from "src/app/models/card";
import { CardsState } from "./cards.reducer";



export const selectFeature = createFeatureSelector<CardsState>("CARDS");


export const selectCards = (state: CardsState) => state.cards;
