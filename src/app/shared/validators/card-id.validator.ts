import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';


// Reactive Forms
@Injectable({ providedIn: 'root' })
export class CardValidatorService {
  constructor(private cardsService: CardsService) {}

  validate(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      // NB Ok perché è una select box: se fosse un input verrebbe chiamato ad ogni tasto: mettere debounceTime nel chiamante o un timer qui dentro
      return this.cardsService.getCards().pipe(
        map((cards) => {
          let index = cards.findIndex((card) => card._id === control.value);
          return index >= 0 ? null : { card: true };
        })
      );
    };
  }
}


// Template Driven Forms
@Directive({
  selector: '[appCardValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: CardValidatorDirective,
      multi: true,
    },
  ],
})
export class CardValidatorDirective implements AsyncValidator {

  constructor(private cardValidatorService: CardValidatorService) {}

  validate(control: AbstractControl):  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.cardValidatorService.validate()(control);
  }
}
