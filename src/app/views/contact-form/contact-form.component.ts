import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() initialContact: Contact | null = null;
  @Output() saveContact = new EventEmitter<Contact>();

  submit(value: Contact) {
    if (this.initialContact) {
      value._id = this.initialContact._id;
    }
    this.saveContact.emit(value);
  }
}
