import { Component, OnInit } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { distinct, filter, map, take, toArray } from 'rxjs/operators';
import { MockService } from 'src/app/core/services/mock.service';
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

  constructor(private _mock: MockService){}

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

    // TODO chiamata a servizio
    this.movements = this._mock.getMovements();
    this.cards = this._mock.getCards();

  }
}
