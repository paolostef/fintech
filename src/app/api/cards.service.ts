import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Card } from '../models/card';
import { CardForm } from '../models/card-form';
import { PagedMovements } from './models/paged-movements';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  /*
  Ritorna l’elenco di Card
  */
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${env.apiUrl}/cards`);
  }

  /*
  Aggiunge una carta: il nome del tipo del parametro sceglilo tu, deve includere i campi type, name, surname, number e csc. Ritorna la nuova carta creata.
  */
  addCard(card: CardForm): Observable<Card> {
    return this.http.post<Card>(`${env.apiUrl}/cards`, card);
  }

  /*
  Rimuove la carta. Ritorna true in caso di successo, altrimenti false.
  */
  deleteCard(cardId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${env.apiUrl}/cards/${cardId}`);
  }

  /*
  Ritorna l’elenco dei movimenti per la Card. Puoi specificare “limit” e “offset” come parametri di query.
  */
  getMovements(
    cardId: string,
    offset: number,
    limit: number
  ): Observable<PagedMovements> {
    return this.http.get<PagedMovements>(
      `${env.apiUrl}/cards/${cardId}/movements?limit=${limit}&offset=${offset}`
    );
  }
}
