import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Card } from 'src/app/models/card';
import { Contact } from 'src/app/models/contact';
import { DayWithSlots } from 'src/app/models/day-with-slots';
import { Location } from 'src/app/models/location';
import Movement from 'src/app/models/movement';
import { DateUtilsService } from './data-utils.service';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor(private _dateUtils: DateUtilsService) {}

  getCards(): Card[] {
    return [
      {
        _id: '4e6a860f-6e18-4406-a1bd-7e31bdb65390',
        number: '0000 0000 0000 0000',
        ownerId: 'et45er5e6fba',
        owner: 'Mario Rossi',
        type: 'visa',
        amount: 15000,
      },
      {
        _id: '77e23f73-8cca-4725-a69b-fb02c2eddf68',
        number: '1111 1111 1111 1111',
        ownerId: 'et45er5e6fba',
        owner: 'Mario Rossi',
        type: 'mastercard',
        amount: 500,
      },
      {
        _id: '05e59baf-6ca5-4687-ace9-8d62586e8bf3',
        number: '2222 2222 2222 2222',
        ownerId: 'et45er5e6fba',
        owner: 'Mario Rossi',
        type: 'visa',
        amount: 250000,
      },
    ];
  }

  getMovements(): Movement[] {
    let movs: Movement[] = [];
    for (let i = 0; i < 50; i++) {
      movs.push({
        _id: 'mov' + i,
        type: i % 2 == 0 ? 'in' : 'out',
        amount: Math.floor(Math.random() * 2000),
        title: 'Movimento n° ' + i,
        description:
          Math.random() < 0.5
            ? 'La meccanica quantistica è la teoria fisica che descrive il comportamento della materia, della radiazione e le reciproche interazioni, con particolare riguardo ai fenomeni caratteristici della scala di lunghezza o di energia atomica e subatomica[2], dove le precedenti teorie classiche risultano inadeguate.'
            : 'Il Dialogo sopra i due massimi sistemi del mondo è un celeberrimo trattato di Galileo Galilei, scritto sotto forma dialogica negli anni tra il 1624 e il 1630, durante il suo soggiorno presso Villa Sagredo nella Riviera del Brenta, e pubblicato nel 1632, con il frontespizio inciso da Stefano della Bella [1]',
        cardId:
          Math.random() < 0.5 ? '1111 1111 1111 1111' : '2222 2222 2222 2222',
        timestamp: new Date().getTime(),
      });
    }
    return movs;
  }

  private contacts: Contact[] = [
    {
      _id: 'Michele_Stieven',
      name: 'Michele',
      surname: 'Stieven',
      iban: '1111 1111 1111 1111',
    },

    {
      _id: 'Fabio_Biondi',
      name: 'Fabio',
      surname: 'Biondi',
      iban: '1234 1234 1234 1234',
    },
  ];

  getContacts(): Contact[] {
    return this.contacts;
  }

  setContact(c: Contact[]) {
    this.contacts = c;
  }

  getSites(): Location[] {
    return [
      {
        _id: '1',
        name: 'Sede 1',
        address: 'Via Cantarane, Verona',
        phone: '123456',
        email: 'email_1@email.it',
        coords: [45.43936, 11.01406],
      },
      {
        _id: '2',
        name: 'Sede 2',
        address: 'Vicolo Pomodoro, Verona',
        phone: '789999999',
        email: 'email_2@email.it',
        coords: [45.44008, 10.98982],
      },
    ];
  }

  getSlots(siteId: string): Observable<DayWithSlots[]> {
    const data: DayWithSlots[] = [];
    for (let i = 1; i <= 30; i++) {
      if (i % 2 === 0) {
        const date = new Date();
        date.setDate(i);
        data.push({
          day: this._dateUtils.dateToString(date),
          slots: [9, 10, 11, 12, 14, 15, 16, 17],
        });
      }
    }
    return of(data).pipe(delay(500));
  }
}
