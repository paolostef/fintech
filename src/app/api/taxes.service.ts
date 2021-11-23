import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaxesService {
  constructor(private http: HttpClient) {}

  /*
  Ritorna true in caso di successo, false altrimenti.
  */
  taxes(taxes: any): Observable<boolean> {
    return this.http.post<boolean>(`${env.apiUrl}/taxes`, taxes);
  }
}
