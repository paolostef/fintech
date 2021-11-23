import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

// Reactive Forms
export function ibanValidator(
  control: AbstractControl
): ValidationErrors | null {
  return validateIBAN(control.value) ? null : { iban: true };
}

// Template Driven Forms
@Directive({
  selector: '[appIbanValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IbanValidator, multi: true },
  ],
})
export class IbanValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return ibanValidator(control);
  }
}


function validateIBAN(value: string): boolean {
  if (!value) {
    return false;
  }
  const codeLengths : any = {
    AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29, CH: 21, CR: 21, CY: 28, CZ: 24,
    DE: 22, DK: 18, DO: 28, EE: 20, ES: 24, LC: 30, FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28,
    HR: 21, HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28, LI: 21, LT: 20, LU: 20, LV: 21,
    MC: 27, MD: 24, ME: 22, MK: 19, MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
    RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
  };
    const iban = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
    let digits: string;
    if (!code || iban.length !== codeLengths[code[1]]) {
      return false;
    }
    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, (letter: string) => {
      return "" + (letter.charCodeAt(0) - 55);
    });
    return mod97(digits) === 1;
}

function mod97(digital: number | string) : number | string {
  digital = digital.toString();
  let checksum: number | string = digital.slice(0, 2);
  let fragment = '';
  for (let offset = 2; offset < digital.length; offset += 7) {
    fragment = checksum + digital.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}
