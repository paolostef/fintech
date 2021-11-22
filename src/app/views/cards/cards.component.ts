import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockService } from 'src/app/core/services/mock.service';
import { Card } from 'src/app/models/card';
import { CardForm } from 'src/app/models/card-form';
import { CardFormComponent } from './card-form/card-form.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @ViewChild(MatDrawer, { static: true }) matDrawer?: MatDrawer;
  @ViewChild('insertCard') cardForm?: CardFormComponent;

  cards: Card[] = this._mock.getCards();

  constructor(private _snackBar: MatSnackBar, private _mock: MockService) {}

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
