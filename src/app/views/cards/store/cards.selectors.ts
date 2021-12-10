import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardsState } from './cards.reducer';

export const selectFeature = createFeatureSelector<{
  cardsState: CardsState;
}>('cards');

export const selectFeatureState = createSelector(
  selectFeature,
  (state) => state.cardsState
);

export const selectCards = createSelector(
  selectFeatureState,
  (state) => state.cards
);
