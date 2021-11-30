import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { catchError, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { DayWithSlot } from 'src/app/models/day-with-slot';
import { DayWithSlots } from 'src/app/models/day-with-slots';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  locations$ = new BehaviorSubject<Location[]>([]);

  selectedLocationId$ = new BehaviorSubject<string | null>(null);

  selectedLocation$ = combineLatest([
    this.locations$,
    this.selectedLocationId$,
  ]).pipe(
    map(([locations, id]) =>
      id ? locations.filter((x) => x._id === id)[0] : null
    )
  );
  // selectedCoords$ esiste perché non avviene la sottoscrizione automatica di selectedLocation$
  selectedCoords$ = new BehaviorSubject<number[] | undefined>(undefined);
  selectedCoordsSub: Subscription = this.selectedLocation$
    .pipe(map((location) => location?.coords))
    .subscribe(this.selectedCoords$);

  daysWithSlots$ = this.selectedLocationId$.pipe(
    filter((id) => id !== null),
    switchMap((id) =>
      this.appointmentsService.getSlots(id + '').pipe(
        catchError((err) => {
          console.error(err);
          return [];
        })
      )
    )
  );

  @ViewChild(MatDrawer, { static: true }) matDrawer!: MatDrawer;

  constructor(
    private snackBar: MatSnackBar,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit() {
    this.appointmentsService.getLocations().subscribe(this.locations$);
  }

  openSite(location: Location) {
    if (this.selectedLocationId$.getValue() !== location._id) {
      this.selectedLocationId$.next(null);
      if (this.matDrawer.opened) {
        this.matDrawer.close();
      }
      // Un po' di timeout per vedere l'effetto chiudi/apri
      setTimeout(() => {
        this.selectedLocationId$.next(location._id);
        this.matDrawer.open();
      }, 200);
    }
  }

  addAppointment(slot: DayWithSlot) {
    console.log(slot);
    this.matDrawer.close();
    this.selectedLocationId$.next(null);
    this.appointmentsService.schedule(slot).subscribe({
      next: (esit) => {
        if (esit) {
          this.snackBar.open('Appuntamento confermato!', 'Ok');
        } else {
          this.snackBar.open("Impossibile confermare l'appuntamento", 'KO');
        }
      },
      error: console.error,
    });
  }

  ngOnDestroy() {
    this.selectedCoordsSub.unsubscribe();
  }
}
