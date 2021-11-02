import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Output() viewMovement = new EventEmitter<string>();
  @Output() removeMovement = new EventEmitter<string>();
  @Output() addMovment = new EventEmitter<void>();

  cards: Card[] = [
    {
      _id: '4e6a860f-6e18-4406-a1bd-7e31bdb65390',
      number: '0000 0000 0000 0000',
      ownerId: 'et45er5e6fba',
      owner: 'Mario Rossi',
      type: 'visa',
      amount: 15000,
    },
    {
      _id: '77e23f73-8cca-4725-a69b-fb02c2eddf68',
      number: '1111 1111 1111 1111',
      ownerId: 'et45er5e6fba',
      owner: 'Mario Rossi',
      type: 'mastercard',
      amount: 500,
    },
    {
      _id: '05e59baf-6ca5-4687-ace9-8d62586e8bf3',
      number: '2222 2222 2222 2222',
      ownerId: 'et45er5e6fba',
      owner: 'Mario Rossi',
      type: 'visa',
      amount: 250000,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  viewItem(card: Card) {
    this.viewMovement.emit(card._id);
  }
  removeItem(card: Card) {
    this.removeMovement.emit(card._id);
  }

  addItem() {
    this.addMovment.emit();
  }
}
