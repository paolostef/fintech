import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Output() viewMovement = new EventEmitter<string>();
  @Output() removeMovement = new EventEmitter<string>();
  @Output() addMovement = new EventEmitter<void>();

  @Input() cards: Card[] = [];

  constructor() {}

  ngOnInit(): void {}

  viewItem(card: Card) {
    this.viewMovement.emit(card._id);
  }
  removeItem(card: Card) {
    this.removeMovement.emit(card._id);
  }

  addItem() {
    this.addMovement.emit();
  }
}
