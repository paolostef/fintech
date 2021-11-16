import {
  Component,
  EventEmitter, Input, Output
} from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  @Input()
  contacts!: Contact[];

  @Output()
  select = new EventEmitter<string>();
  @Output()
  edit = new EventEmitter<string>();
  @Output()
  delete = new EventEmitter<string>();

  clickSelect(contact: Contact) {
    this.select.emit(contact._id);
  }

  clickEdit(contact: Contact) {
    this.edit.emit(contact._id);
  }

  clickDelete(contact: Contact) {
    this.delete.emit(contact._id);
  }
}
