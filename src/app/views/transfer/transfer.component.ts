import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockService } from 'src/app/core/services/mock.service';
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
    private _mock: MockService,
    private _snackBar: MatSnackBar,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cards = this._mock.getCards();
  }

  openContactList() {
    const dialogRef = this._dialog.open(ContactsComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((id) => {
      console.log('The dialog was closed', id);
      const {name, surname, iban} = this._mock
        .getContacts()
        .filter((c) => c._id === id)[0];
      this.form.setValue({
        ...this.form.value,
        name,
        surname,
        iban
      });
    });
  }

  submitTransfer(transfer: Transfer) {
    console.log(transfer);
    // TODO CHIAMA IL SERVER
    this._snackBar.open('Trasferimento avvenuto con successo', 'Ok');
  }
}
