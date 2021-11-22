import {
  AfterViewInit,
  Component,
  EventEmitter, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardForm } from 'src/app/models/card-form';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnInit, AfterViewInit {
  @Output() add = new EventEmitter<CardForm>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('f', { read: NgForm }) form!: NgForm;

  cardTypes = [
    {
      code: 'mastercard',
      text: 'Mastercard',
    },
    {
      code: 'visa',
      text: 'Visa',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    // console.log('f:', this.form);
  }

  save(data: CardForm) {
    this.add.emit(data);
  }

  undo() {
    this.cancel.emit();
  }

  public cleanup() {
    this.form.reset();
    // Perché Angular Material si incasiva col flag this.form.submitted
    this.form.resetForm();
  }
}
