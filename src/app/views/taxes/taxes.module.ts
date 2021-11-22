import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesComponent } from './taxes.component';

@NgModule({
  declarations: [TaxesComponent],
  imports: [CommonModule],
  exports: [TaxesComponent],
})
export class TaxesModule {}
