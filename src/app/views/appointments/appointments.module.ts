import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentsComponent } from './appointments.component';
import { LocationListComponent } from './location-list/location-list.component';



@NgModule({
  declarations: [AppointmentsComponent, AppointmentComponent, LocationListComponent],
  imports: [
    CommonModule, SharedModule, MaterialModule
  ],
   exports: [AppointmentsComponent, AppointmentComponent, LocationListComponent]
})
export class AppointmentsModule { }
