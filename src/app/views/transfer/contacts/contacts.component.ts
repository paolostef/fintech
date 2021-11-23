import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactsService } from 'src/app/api/contacts.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  contacts: Contact[] = [];
  showList = true;
  initialContact: Contact | null = null;

  constructor(
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactsService.getContacts().subscribe({
      next: (c) => (this.contacts = c),
      error: console.error,
    });
  }

  exitNoAction() {
    this.dialogRef.close();
  }

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
    this.contactsService.deleteContact(id).subscribe({
      next: (ok) => {
        if (ok) {
          this.contacts = this.contacts.filter((x) => x._id !== id);
        }
      },
    });
  }

  saveContact(contact: Partial<Contact>) {
    if (!contact._id) {
      this.contactsService.addContact(contact).subscribe({
        next: (savedContact) => {
          this.contacts = [...this.contacts, savedContact];
        },
      });
    } else {
      this.contactsService.updateContact(contact).subscribe({
        next: (savedContact) => {
          this.contacts = this.contacts.map((x) => {
            if (x._id === contact._id) {
              return savedContact;
            } else {
              return x;
            }
          });
        },
      });
    }
    this.showList = true;
  }
}
