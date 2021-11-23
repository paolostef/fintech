import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualsFieldsValidator } from './equal-fields.validator';

const validators = [EqualsFieldsValidator];

@NgModule({
  declarations: [...validators],
  imports: [CommonModule],
  exports: [...validators]
})
export class ValidatorsModule {}
