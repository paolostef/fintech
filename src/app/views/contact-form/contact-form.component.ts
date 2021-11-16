import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Output() saveContact = new EventEmitter<Contact>();

  submit(value: Contact) {
    this.saveContact.emit(value);
  }
}
