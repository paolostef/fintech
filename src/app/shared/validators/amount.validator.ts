import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Reactive Forms
export function amountValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  return typeof value === 'number' && +value >= 0 ? null : { amount: true };
}

// Template Driven Forms
@Directive({
  selector: '[appAmountValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AmountValidator, multi: true },
  ],
})
export class AmountValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return amountValidator(control);
  }
}
