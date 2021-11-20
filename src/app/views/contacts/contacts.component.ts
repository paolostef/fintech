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
  showList = true;
  initialContact: Contact | null = null;

  constructor(
    private _mock: MockService,
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contacts = this._mock.getContacts();
  }

  exitNoAction() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  selectItem(id: string) {
    console.log(id);
    const item = this.contacts.filter((x) => x._id === id)[0];
    this.dialogRef.close(id);
  }

  addItem() {
    this.initialContact = null;
    this.showList = false;
  }

  editItem(id: string) {
    this.initialContact = this.contacts.filter((x) => x._id === id)[0];
    this.showList = false;
  }

  deleteItem(id: string) {
    this.contacts = this.contacts.filter((x) => x._id !== id);
    this._mock.setContact(this.contacts);
  }

  saveContact(contact: Contact) {
    if (!contact._id) {
      contact._id = Math.random() + '';
      this.contacts = [...this.contacts, contact];
      console.log("Aggiunto contatto", contact);
    } else {
      this.contacts = this.contacts.map((x) => {
        if (x._id === contact._id) {
          return contact;
        } else {
          return x;
        }
      });
      console.log("Modificato contatto", contact);
    }
    this._mock.setContact(this.contacts);
    this.showList = true;
  }
}
