import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import Movement from 'src/app/models/movement';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  movements: Movement[] = [];
  movementsCount = 0;
  cards: Card[] = [];
  selectedCard: Card | undefined = undefined;
  offset: number = 0;
  LIMIT: number = 5;
  queryParamId: string = "";

  constructor(
    private cardsService: CardsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cardsService.getCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        const cardId = this.route.snapshot.paramMap.get('id');
        if (!!cardId && this.isValid(cardId)) {
          this.queryParamId = cardId;
          this.selectCard(cardId);
        }
      },
      error: console.error,
    });
  }

  isValid(cardId: string): boolean {
    return this.cards.findIndex((c) => c._id === cardId) != -1;
  }

  selectCard(cardId: string) {
    this.selectedCard = this.cards.find((c) => c._id === cardId);
    // Mostro i primi 5 movimenti di quella carta
    this.movements = [];
    this.movementsCount = 0;
    this.offset = 0;
    this.loadPage(cardId, this.offset);
  }

  getNextPage() {
    if (this.selectedCard) {
      this.offset += this.LIMIT;
      this.loadPage(this.selectedCard._id, this.offset);
    }
  }

  getTotalAmount(): number {
    return this.movements
      .map((m) => (m.type === 'in' ? m.amount : -1 * m.amount))
      .reduce((acc, curr) => acc + curr, 0);
  }

  loadPage(cardId: string, offset: number) {
    this.cardsService.getMovements(cardId, offset, this.LIMIT).subscribe({
      next: (movs) => {
        this.movements = [...this.movements, ...movs.data];
        this.movementsCount = movs.total;
      },
      error: console.error,
    });
  }
}
