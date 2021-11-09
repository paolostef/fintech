import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardForm } from 'src/app/models/card-form';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @ViewChild(MatDrawer, { static: true }) matDrawer?: MatDrawer;
  @ViewChild('insertCard') cardForm?: CardFormComponent;

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

  constructor(private _snackBar: MatSnackBar) {}

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
    this.closeAddMovement();
    this._snackBar.open('Card aggiunta!', 'Ok');
  }

  removeMovement(id: string) {
    this.cards = this.cards.filter((x) => x._id != id);
    this._snackBar.open('Card rimossa!', 'Ok');
  }

  viewMovement(id: String) {
    //TODO
  }

  addMovement() {
    if (this.matDrawer) {
      this.matDrawer.open();
    }
  }

  closeAddMovement() {
    if (this.matDrawer) {
      this.cardForm?.cleanup();
      // NB Il drawer si chiude dopo o perdo la referenza
      this.matDrawer.close();
    }
  }
}
