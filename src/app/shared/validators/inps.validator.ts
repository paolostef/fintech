import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

// Reactive Forms
export function inpsValidator(
  fieldName1: string,
  fieldName2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const field1 = control.get(fieldName1)?.value;
    const field2 = control.get(fieldName2)?.value;
    if (!field1 || !field2) {
      // lascio il compito al validatore obbligatorietà
      return null;
    }
    if (!(field1 instanceof Date) || !(field2 instanceof Date)) {
      return { inps: 'Non hai inserito una data valida' };
    }
    const date1 = (field1 as Date).getTime();
    const date2 = (field2 as Date).getTime();
    if (date1 > date2) {
      return { inps: 'La data di inizio deve essere precedente alla data di fine' };
    }
    return null;
  };
}

// Template Driven Forms
@Directive({
  selector: '[appinpsValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: InpsValidator, multi: true },
  ],
})
export class InpsValidator implements Validator {
  @Input('fieldName1') fieldName1!: string;
  @Input('fieldName2') fieldName2!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return inpsValidator(this.fieldName1, this.fieldName2)(control);
  }
}
