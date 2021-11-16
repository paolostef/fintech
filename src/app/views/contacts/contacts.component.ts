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
  ) {
    this.contacts = this._mock.getContacts();
  }

  exitNoAction() {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  addItem() {}

  selectItem(id: string) {
    console.log(id);
    const item = this.contacts.filter((x) => x._id === id)[0];
    this.dialogRef.close(item);
  }
  editItem(id: string) {
    console.log(id);
  }
  deleteItem(id: string) {
    console.log(id);
  }

  back() {}

  saveContact(contact: Contact) {}
}
