import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  /*
  Ritorna l’elenco di contatti.
  */
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${env.apiUrl}/contacts`);
  }

  /*
  Aggiunge un contatto. Richiede tutti i dati del Contact a parte l’id, ritorna il Contact con il nuovo id.
  */
  addContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(`${env.apiUrl}/contacts`, contact);
  }

  /*
  Aggiorna il contatto.
  */
  updateContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(
      `${env.apiUrl}/contacts/${contact._id}`,
      contact
    );
  }

  /*
  Rimuove il contatto. Ritorna true in caso di successo, false altrimenti.
  */
  deleteContact(contactId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${env.apiUrl}/contacts/${contactId}`);
  }
}
