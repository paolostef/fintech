import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { ContactsService } from 'src/app/api/contacts.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts$ = new BehaviorSubject<Contact[]>([]);

  state$ = new BehaviorSubject<StateType>({ type: 'list' });

  editContact$ = this.state$.pipe(
    filter((state) => state.type !== 'list'),
    withLatestFrom(this.contacts$),
    map(([state, contacts]) =>
      state.type === 'edit'
        ? contacts.filter((c) => c._id === state.id)[0]
        : null
    )
  );

  selectedContact$ = new BehaviorSubject<Contact | null>(null);

  constructor(
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.loadContacts();
    this.editContact$.subscribe(this.selectedContact$);
  }

  loadContacts() {
    this.contactsService.getContacts().subscribe(this.contacts$);
  }

  exitNoAction() {
    this.dialogRef.close();
  }

  selectItem(id: string) {
    console.log(id);
    this.dialogRef.close(id);
  }

  addItem() {
    this.state$.next({ type: 'new' });
  }

  editItem(id: string) {
    this.state$.next({ type: 'edit', id });
  }

  deleteItem(id: string) {
    this.contactsService.deleteContact(id).subscribe({
      next: (ok) => this.loadContacts(),
    });
  }

  saveContact(contact: Partial<Contact>) {
    if (!contact._id) {
      this.contactsService.addContact(contact).subscribe({
        next: () => this.loadContacts(),
        error: console.error,
      });
    } else {
      this.contactsService.updateContact(contact).subscribe({
        next: () => this.loadContacts(),
        error: console.error,
      });
    }
    this.backToList();
  }

  backToList() {
    this.state$.next({ type: 'list' });
  }
}

interface StateType {
  type: 'list' | 'new' | 'edit';
  id?: string;
}
