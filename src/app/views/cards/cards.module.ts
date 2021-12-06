import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { CardFormComponent } from './card-form/card-form.component';
import { CardListComponent } from './card-list/card-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { cardsReducer } from './store/cards.reducer';



@NgModule({
  declarations: [CardsComponent, CardFormComponent, CardListComponent],
  imports: [
    CommonModule, SharedModule, MaterialModule, FormsModule,
    StoreModule.forFeature("cards", { cards: cardsReducer })
  ],
  exports: [CardsComponent, CardFormComponent, CardListComponent]
})
export class CardsModule { }
