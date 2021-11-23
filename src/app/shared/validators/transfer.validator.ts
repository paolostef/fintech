import { Directive, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';

/** Per la schermata TransferComponent, questo sarà un validatore asincrono di gruppo e dovrà controllare i campi “Importo” e “Seleziona una carta”. Lo scopo è verificare che la carta selezionata abbia abbastanza denaro per fare il trasferimento, dovrai quindi iniettare un servizio per prenderti l’elenco di carte e controllare il saldo di quella carta. */

// Reactive Forms
@Injectable({ providedIn: 'root' })
export class TransferValidatorService {
  constructor(private cardsService: CardsService) {}

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const cardId = control.get('cardId')?.value;
      const amount = control.get('amount')?.value;
      if (!cardId || !amount) {
        // Ci pensano già i validatori di obbligatorietà
        return of(null);
      }

      console.log(`TransferValidator is active! Checking ${amount}€ for card ${cardId}...`);

      return this.getCards().pipe(
        map((cards) => {
          let index = cards.findIndex((card) => card._id === cardId);
          return index >= 0 && cards[index].amount >= amount
            ? null
            : { transfer: true };
        })
      );
    };
  }

  private getCards() {
    // Validatore che evita di chiamare il backend ad ogni pressione di un tasto: prende l'ultimo valore digitato nel secondo di tempo
    return timer(1000).pipe(
      switchMap(() => this.cardsService.getCards())
    )
  }


  // Validatore semplice che chiama il servizio ad ogni pressione di un tasto
  validate_test(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const cardId = control.get('cardId')?.value;
      const amount = control.get('amount')?.value;
      if (!cardId || !amount) {
        // Ci pensano già i validatori di obbligatorietà
        return of(null);
      }

      console.log(`TransferValidator is active! Checking ${amount}€ for card ${cardId}...`);

      return this.cardsService.getCards().pipe(
        map((cards) => {
          let index = cards.findIndex((card) => card._id === cardId);
          return index >= 0 && cards[index].amount >= amount
            ? null
            : { transfer: true };
        })
      );
    };
  }
}

// Template Driven Forms
@Directive({
  selector: '[appTransferValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: TransferValidatorDirective,
      multi: true,
    },
  ],
})
export class TransferValidatorDirective implements AsyncValidator {
  constructor(private transferValidatorService: TransferValidatorService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.transferValidatorService.validate()(control);
  }
}
