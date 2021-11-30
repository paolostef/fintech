import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateUtilsService } from 'src/app/core/services/data-utils.service';
import { DayWithSlot, HoursType } from 'src/app/models/day-with-slot';
import { DayWithSlots } from 'src/app/models/day-with-slots';
import { OkCancelDialogComponent } from 'src/app/shared/components/ok-cancel-dialog/ok-cancel-dialog.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
  @Input() coords: number[] | undefined = undefined;
  @Input() slots!: DayWithSlots[];
  @Output() select = new EventEmitter<DayWithSlot>();

  selectedDate: DayWithSlots | null = null;

  constructor(
    private _dateUtils: DateUtilsService,
    private dialog: MatDialog
  ) {}

  // Filtro per il calendario angular material
  dateFilter = (d: Date | null): boolean => {
    const day = this._dateUtils.dateToString(d || new Date());
    return this.slots.filter((x) => x.day === day).length === 1;
  };

  dateChange({ value }: { value: Date | null }) {
    if (value) {
      const day = this._dateUtils.dateToString(value);
      this.selectedDate = this.slots.filter((x) => x.day === day)[0];
    } else {
      this.selectedDate = null;
    }
  }

  hourChange(hour: HoursType) {
    if (this.selectedDate && hour) {
      const day = this.selectedDate.day;

      const dialogRef = this.dialog.open(OkCancelDialogComponent, {
        width: '500px',
        data: {
          title: "Confermi l'appuntamento?",
          content: `L'appuntamento sarà fissato per il giorno ${day} alle ${hour}`,
          ok: 'Conferma',
          cancel: 'Annulla',
        },
      });

      dialogRef.afterClosed().subscribe((ok) => {
        if (ok) {
          this.select.emit({
            day: day,
            slot: hour,
          });
        }
      });
    }
  }
}
