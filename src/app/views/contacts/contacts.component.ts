import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockService } from 'src/app/core/services/mock.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private _mock: MockService,
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.contacts = this._mock.getContacts();
  }

  exitNoAction() {
    this.dialogRef.close();
  }
  addItem() {}
  editItem(contact: Contact) {
    console.log(contact);
  }
  deleteItem(contact: Contact) {
    console.log(contact);
  }
}
