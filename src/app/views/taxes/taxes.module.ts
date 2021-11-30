import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesComponent } from './taxes.component';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [TaxesComponent],
  imports: [CommonModule, ValidatorsModule, ReactiveFormsModule, MaterialModule],
  exports: [TaxesComponent],
})
export class TaxesModule {}
