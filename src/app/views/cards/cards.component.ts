import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerContent } from '@angular/material/sidenav';
import { Card } from 'src/app/models/card';
import { CardForm } from 'src/app/models/card-form';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  showAddCard = false;

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

  addCard(data: CardForm) {
    const card = {
      _id: 'x',
      number: data.cardnumber,
      ownerId: 'x',
      owner: data.name + ' ' + data.surname,
      type: data.type,
      amount: 0,
    };
    this.cards = [...this.cards, card];
    this.showAddCard = false;
  }

  removeMovement(id: string) {
    this.cards = this.cards.filter((x) => x._id != id);
  }


  addMovement() {
    this.showAddCard = true;
  }
}
