import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TransferComponent } from './transfer.component';

@NgModule({
  declarations: [
    ContactFormComponent,
    ContactListComponent,
    ContactsComponent,
    TransferComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialModule, FormsModule],
  exports: [
    ContactFormComponent,
    ContactListComponent,
    ContactsComponent,
    TransferComponent,
  ],
})
export class TransferModule {}
