import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Transfer } from '../models/transfer';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(private http: HttpClient) {}

  /*
  Trasferisci denaro. L’oggetto deve avere i campi name (string), surname (string), iban (string), amount (number), cardId (string). Ritorna true in caso di successo.
  */
  transfer(transfer: Transfer): Observable<boolean> {
    return this.http.post<boolean>(`${env.apiUrl}/transfer`, transfer);
  }
}
