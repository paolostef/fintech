import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesComponent } from './taxes.component';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';

@NgModule({
  declarations: [TaxesComponent],
  imports: [CommonModule, ValidatorsModule],
  exports: [TaxesComponent],
})
export class TaxesModule {}
