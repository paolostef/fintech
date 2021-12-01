import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmountValidator } from './amount.validator';
import { CardValidatorDirective } from './card-id.validator';
import { CodiceFiscaleValidator } from './codice-fiscale.validator';
import { EqualsFieldsValidator } from './equal-fields.validator';
import { IbanValidator } from './iban.validator';
import { InpsValidator } from './inps.validator';
import { TransferValidatorDirective } from './transfer.validator';

const validators = [EqualsFieldsValidator, AmountValidator, IbanValidator, CodiceFiscaleValidator, CardValidatorDirective, TransferValidatorDirective, InpsValidator];

@NgModule({
  declarations: [...validators],
  imports: [CommonModule],
  exports: [...validators]
})
export class ValidatorsModule {}
