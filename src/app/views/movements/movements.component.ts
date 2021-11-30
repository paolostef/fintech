import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  scan,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import Movement from 'src/app/models/movement';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit, OnDestroy {
  LIMIT: number = 5;
  // queryParamId: string = '';

  //(contiene la lista di Card)
  cards$ = new BehaviorSubject<Card[]>([]);

  // (contiene l’id della carta selezionata)
  selectedCardId$ = new BehaviorSubject<string>('');

  // (contiene la carta selezionata, DERIVATO)
  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cards, id]) => cards.filter((c) => c._id === id)[0])
  );

  // offset
  offset$ = new BehaviorSubject<number>(0);

  resetOffset$ = this.selectedCardId$.subscribe((cardId) =>
    this.offset$.next(0)
  );

  // (contiene la lista di movimenti visibili a schermo)
  // Versione ok vista col tutor,
  // però ha detto che il puro rxjs consiglia di non usare withLatestFrom con lo stesso input di combineLatest:
  // sarebbe meglio una pipe interna sull'observable this.cardsService.getMovements()
  movements_con_tutor$ = combineLatest([
    this.offset$,
    this.selectedCardId$,
  ]).pipe(
    filter(([offset, cardId]) => !!cardId),
    switchMap(([offset, cardId]) =>
      this.cardsService.getMovements(cardId, offset, this.LIMIT)
    ),
    map((paged) => paged.data),
    withLatestFrom(this.offset$),
    scan(
      (acc: Movement[], [movs, offset]) =>
        offset === 0 ? movs : [...acc, ...movs],
      []
    )
  );

  // L'alternativa era fare una subscribe su movements$ e poi crearsi un BehaviorSubject su cui fare il next con l'array completo
  listaMov_con_tutor$ = new BehaviorSubject<Movement[]>([]);
  ngOnInit_con_tutor() {
    this.movements$.subscribe({
      next: (movs) => {
        this.listaMov_con_tutor$.next([
          ...this.listaMov_con_tutor$.getValue(),
          ...movs,
        ]);
      },
    });
  }

  // Terza versione (mia):
  // - tap aggiorna total$ senza fare nuova chiamata
  // - debounceTime evita una chiamata inutile quando cambio la carta
  movements$ = combineLatest([this.offset$, this.selectedCardId$]).pipe(
    filter(([offset, cardId]) => !!cardId),
    debounceTime(200),
    switchMap(([offset, cardId]) =>
      this.cardsService.getMovements(cardId, offset, this.LIMIT)
    ),
    tap((paged) => this.total$.next(paged.total)),
    map((paged) => paged.data),
    withLatestFrom(this.offset$),
    scan(
      (acc: Movement[], [movs, offset]) =>
        offset === 0 ? movs : [...acc, ...movs],
      []
    )
  );

  // (contiene il totale del movimenti presenti su server per la carta selezionata)
  total$ = new BehaviorSubject<number>(0);

  //(dice se dovrebbe essere visibile il tasto “Carica altro”, DERIVATO)
  shouldLoadMore$ = combineLatest([this.movements$, this.total$]).pipe(
    map(([movements, total]) => movements.length < total)
  );

  // totale
  totalAmount$ = this.movements$.pipe(
    map((movements) => this.getTotalAmount(movements))
  );

  subscriptions: Subscription[] = [];

  constructor(
    private cardsService: CardsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const sub1 = this.cardsService.getCards().subscribe(this.cards$);
    this.subscriptions.push(sub1);

    const sub2 = this.route.params
      .pipe(
        filter((value) => !!value.id),
        map((value) => value.id)
      )
      .subscribe(this.selectedCardId$);
    this.subscriptions.push(sub2);

    this.subscriptions.push(this.resetOffset$);
  }

  selectCard(cardId: string) {
    console.log('selectCard ' + cardId);
    this.selectedCardId$.next(cardId);
  }

  getNextPage() {
    this.offset$.next(this.offset$.getValue() + this.LIMIT);
  }

  getTotalAmount(movements: Movement[]) {
    return movements
      .map((m) => (m.type === 'in' ? m.amount : -1 * m.amount))
      .reduce((acc, curr) => acc + curr, 0);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
