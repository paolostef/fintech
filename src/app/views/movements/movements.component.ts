import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { distinct, filter, map, take, toArray } from 'rxjs/operators';
import { Card } from 'src/app/models/card';
import Movement from 'src/app/models/movement';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  movements: Movement[] = [];
  cards: Card[] = [];
  selectedCard: Card | undefined = undefined;
  pageNumber: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this.createMockData();
  }

  selectCard(cardId: string) {
    this.selectedCard = this.cards.find((c) => c._id === cardId);
    // Mostro i primi 5 movimenti di quella carta
    this.pageNumber = 0;
  }

  getNextPage() {
    this.pageNumber++;
  }

  showLoadButton(): boolean {
    // TODO Immagino che il totalCount verrà dal server
    const totalCount = this.movements.filter(
      (m) => m.cardId === this.selectedCard?.number
    ).length;
    const size = this.getMovementsPaged().length;
    return totalCount > size;
  }

  getMovementsPaged(): Movement[] {
    // TODO Immagino che la paginazione sarà sul server
    return this.movements
      .filter((m) => m.cardId === this.selectedCard?.number)
      .splice(0, this.pageNumber * this.pageSize + this.pageSize);
  }

  getTotalAmount(): number {
    return this.movements
      .filter((m) => m.cardId === this.selectedCard?.number)
      .map((m) => (m.type === 'in' ? m.amount : -1 * m.amount))
      .reduce((acc, curr) => acc + curr, 0);
  }

  createMockData() {
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
    this.movements = movs;

    // TODO chiamata a servizio
    this.cards = [
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
}
