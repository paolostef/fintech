import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Reactive Forms
export function codiceFiscaleValidator(
  control: AbstractControl
): ValidationErrors | null {
  let value = control.value + '';
  if (!value || value.length != 16) {
    return { codiceFiscale: true };
  }

  value = value.toUpperCase();
  if (
    !/^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/.test(
      value
    )
  ) {
    return { codiceFiscale: true };
  } else {
    return null;
  }
}

// Template Driven Forms
@Directive({
  selector: '[appCodiceFiscaleValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CodiceFiscaleValidator,
      multi: true,
    },
  ],
})
export class CodiceFiscaleValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return codiceFiscaleValidator(control);
  }
}
