import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletMapComponent } from './shared/components/leaflet-map/leaflet-map.component';
import { OkCancelDialogComponent } from './shared/components/ok-cancel-dialog/ok-cancel-dialog.component';
import { MaterialModule } from './shared/material.module';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';
import { CardFormComponent } from './views/card-form/card-form.component';
import { CardListComponent } from './views/card-list/card-list.component';
import { CardsComponent } from './views/cards/cards.component';
import { ContactFormComponent } from './views/contact-form/contact-form.component';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { LocationListComponent } from './views/location-list/location-list.component';
import { LoginComponent } from './views/login/login.component';
import { MovementComponent } from './views/movement/movement.component';
import { MovementsComponent } from './views/movements/movements.component';
import { RegisterComponent } from './views/register/register.component';
import { SigninComponent } from './views/signin/signin.component';
import { TransferComponent } from './views/transfer/transfer.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { WelcomeComponent } from './views/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    LoginComponent,
    CardListComponent,
    CardFormComponent,
    CardsComponent,
    MovementComponent,
    MovementsComponent,
    TruncatePipe,
    TransferComponent,
    ContactsComponent,
    ContactListComponent,
    ContactFormComponent,
    FilterPipe,
    AppointmentsComponent,
    AppointmentComponent,
    LocationListComponent,
    LeafletMapComponent,
    OkCancelDialogComponent,
    DashboardComponent,
    SidenavComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
