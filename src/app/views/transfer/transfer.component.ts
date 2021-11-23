import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsService } from 'src/app/api/cards.service';
import { ContactsService } from 'src/app/api/contacts.service';
import { TransferService } from 'src/app/api/transfer.service';
import { Card } from 'src/app/models/card';
import { Transfer } from 'src/app/models/transfer';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  @ViewChild('f', { read: NgForm }) form!: NgForm;

  cards: Card[] = [];

  constructor(
    private cardsService: CardsService,
    private contactsService: ContactsService,
    private transferService: TransferService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe({
      next: (cards) => (this.cards = cards),
      error: console.error,
    });
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

  submitTransfer(transfer: Transfer) {
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
