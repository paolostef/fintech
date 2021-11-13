import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockService } from 'src/app/core/services/mock.service';
import { Card } from 'src/app/models/card';
import { Contact } from 'src/app/models/contact';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  cards: Card[] = [];
  selectedContact : Contact | null = null;

  constructor(private _mock: MockService, private _snackBar: MatSnackBar, public _dialog: MatDialog) {}

  ngOnInit(): void {
    this.cards = this._mock.getCards();
  }

  openContactList() {
    const dialogRef = this._dialog.open(ContactsComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.selectedContact = result;
    });
  }

  transfer(value: any) {
    console.log(value);
    this._snackBar.open("Trasferimento avvenuto con successo", "Ok")
  }
}
