import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { DayWithSlot } from 'src/app/models/day-with-slot';
import { DayWithSlots } from 'src/app/models/day-with-slots';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  sites: Location[] = [];
  slots: DayWithSlots[] = [];
  selectedSite: Location | null = null;

  @ViewChild(MatDrawer, { static: true }) matDrawer!: MatDrawer;

  constructor(
    private snackBar: MatSnackBar,
    private appointmentsService: AppointmentsService
  ) {
    this.appointmentsService.getLocations().subscribe({
      next: (locations) => (this.sites = locations),
      error: console.error
    });
  }

  openSite(location: Location) {
    if (this.selectedSite != location) {
      this.selectedSite = null;
      if (this.matDrawer.opened) {
        this.matDrawer.close();
      }
      this.appointmentsService.getSlots(location._id).subscribe({
        next: (result) => {
          this.slots = result;
          // Un po' di timeout per vedere l'effetto chiudi/apri
          setTimeout(() => {
            this.selectedSite = location;
            this.matDrawer.open();
          }, 200);
        },
        error: console.log,
      });
    }
  }

  addAppointment(slot: DayWithSlot) {
    console.log(slot);
    this.matDrawer.close();
    this.selectedSite = null;
    this.appointmentsService.schedule(slot).subscribe({
      next: (esit) => {
        if (esit) {
          this.snackBar.open('Appuntamento confermato!', 'Ok');
        } else {
          this.snackBar.open("Impossibile confermare l'appuntamento", 'KO');
        }
      },
      error: console.error
    });
  }
}
