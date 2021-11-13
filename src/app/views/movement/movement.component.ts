import { Component, Input, OnInit } from '@angular/core';
import { MovementType } from 'src/app/models/movement';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss'],
})
export class MovementComponent implements OnInit {
  @Input() date!: string;
  @Input() amount!: number;
  @Input() type!: MovementType;
  @Input() title!: string;
  @Input() description!: string;

  panelOpenState = false;

  constructor() {}

  ngOnInit(): void {}
}
