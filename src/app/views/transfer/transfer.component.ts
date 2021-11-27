import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';
import { ContactsService } from 'src/app/api/contacts.service';
import { TransferService } from 'src/app/api/transfer.service';
import { Card } from 'src/app/models/card';
import { Transfer } from 'src/app/models/transfer';
import { TransferForm } from 'src/app/models/transfer-form';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  @ViewChild('f', { read: NgForm }) form!: NgForm;

  // cards: Card[] = [];
  cards$ = new BehaviorSubject<Card[]>([]);

  constructor(
    private cardsService: CardsService,
    private contactsService: ContactsService,
    private transferService: TransferService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const wrongCard: Card = {
      _id: 'NON__ESITO!!!!',
      number: 'NON__ESITO!!!!',
      ownerId: 'NON__ESITO!!!!',
      owner: 'NON__ESITO!!!!',
      type: 'visa',
      amount: 0,
    };

    this.cardsService
      .getCards()
      .pipe(map((cards) => [...cards, wrongCard]))
      .subscribe(this.cards$);
  }

  openContactList() {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((id) => {
      console.log('The dialog was closed', id);
      if (id) {
        this.contactsService.getContacts().subscribe({
          next: (contacts) => {
            const { name, surname, iban } = contacts.filter(
              (c) => c._id === id
            )[0];
            this.form.setValue({
              ...this.form.value,
              name,
              surname,
              iban,
            });
          },
        });
      }
    });
  }

  submitTransfer(data: TransferForm) {
    console.log(data);
    let transfer: Transfer = {
      name: data.name,
      surname: data.surname,
      iban: data.iban,
      amount: data.amountAndCard.amount,
      cardId: data.amountAndCard.cardId,
    };
    this.transferService.transfer(transfer).subscribe({
      next: (ok) => {
        if (ok) {
          this.snackBar.open('Trasferimento avvenuto con successo', 'Ok');
        } else {
          this.snackBar.open('Trasferimento NON riuscito', 'KO');
        }
      },
      error: console.error,
    });
  }
}
