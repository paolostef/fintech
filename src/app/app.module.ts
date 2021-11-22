import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { AppointmentsModule } from './views/appointments/appointments.module';
import { CardsModule } from './views/cards/cards.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { LoginModule } from './views/login/login.module';
import { MovementsModule } from './views/movements/movements.module';
import { TaxesModule } from './views/taxes/taxes.module';
import { TransferModule } from './views/transfer/transfer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    CardsModule,
    AppointmentsModule,
    LoginModule,
    DashboardModule,
    MovementsModule,
    TransferModule,
    TaxesModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
