import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Location } from 'src/app/models/location';
import { DayWithSlots } from '../models/day-with-slots';
import { DayWithSlot } from '../models/day-with-slot';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  /*
  Ritorna l’elenco di sedi
  */
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${env.apiUrl}/locations`);
  }

  /*
  Ritorna l’elenco di slot disponibili per una sede
  */
  getSlots(locationId: string): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(`${env.apiUrl}/slots/${locationId}`);
  }

  /*
  Conferma un appuntamento. Ritorna true in caso di successo, altrimenti false.
  */
  schedule(body: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(`${env.apiUrl}/schedule`, body);
  }
}
