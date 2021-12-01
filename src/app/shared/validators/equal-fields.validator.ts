import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

// Reactive Forms
export function equalsFieldsValidator(
  fieldName1: string,
  fieldName2: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const field1 = control.get(fieldName1)?.value;
    const field2 = control.get(fieldName2)?.value;
    if (field1 && field2 && field1 !== field2) {
      return { equalsFields: true };
    }
    return null;
  };
}

// Template Driven Forms
@Directive({
  selector: '[appEqualsFieldsValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualsFieldsValidator, multi: true },
  ],
})
export class EqualsFieldsValidator implements Validator {
  @Input('fieldName1') fieldName1!: string;
  @Input('fieldName2') fieldName2!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return equalsFieldsValidator(this.fieldName1, this.fieldName2)(control);
  }
}
